package org.iusp.base.controller;

import org.iusp.base.model.config.AppConfig;
import org.iusp.base.model.config.Module;
import org.iusp.base.model.config.ModuleGroup;
import org.iusp.base.service.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
public class BaseConfigController {

    @Autowired
    private ConfigService configService;

    @RequestMapping(value = "/config/appconfig",method = RequestMethod.GET)
    @ResponseBody
    public Object getAppConfig(HttpServletRequest request) throws Exception {

        AppConfig config = getAppConfig("123456", null, "iusp", false);
        return config;
    }

    private AppConfig getAppConfig(String s, Object o, String iusp, boolean b) throws Exception {

        //用于存放整理后的ModuleGroup
        List<ModuleGroup> mgList = new ArrayList<ModuleGroup>();
        AppConfig config = new AppConfig();

        List<AppConfig> al = new ArrayList<AppConfig>();
        AppConfig obj = (AppConfig) configService.getConfigObject(AppConfig.class, "storeAdmin" + ".xml");
        al.add(obj);

        //先过滤掉重复的配置
        int mgCount = 0;
        if(al != null && al.size() > 0){
            //用于记录ModuleGroup是否已经出现过
            Map<String, Integer> mgMap = new HashMap<String, Integer>();
            //用于记录Module是否已经出现过
            Map<String, Integer> mMap = new HashMap<String, Integer>();

            for(AppConfig ac : al){
                //一些设置，暂时没有用处
                config.setUiConfig(ac.getUiConfig());

                //获取单个权限对应的模块组
                List<ModuleGroup> mgtList = ac.getModuleList();
                if(mgtList == null || mgtList.size() == 0){
                    continue;
                }

                //获取模块组中的模块
                for(ModuleGroup mg : mgtList){
                    String mgName = mg.getName();
                    if(mgMap.containsKey(mgName)){
                        List<Module> mList = mg.getSubModules();
                        if(mList != null && mList.size() > 0){
                            int idx = mgMap.get(mgName);
                            for(Module m : mList){
                                String mapName = mgName + m.getName();
                                if(!mMap.containsKey(mapName)){
                                    mgList.get(idx).getSubModules().add(m);
                                }
                            }
                        }
                    }else{
                        List<Module> mList = mg.getSubModules();
                        if(mList != null && mList.size() > 0){
                            for(Module m : mList){
                                mMap.put(mgName + m.getName(), 0);
                            }
                        }
                        mgList.add(mgCount, mg);
                        mgMap.put(mgName, mgCount);
                        mgCount++;
                    }
                }
            }
        }

        //排序(根据配置文件中的index属性)
        if(mgList.size() > 0){
            compareModuleByIndex cm = new compareModuleByIndex();
            compareModuleGroupByIndex cm2 = new compareModuleGroupByIndex();
            for(ModuleGroup mg : mgList){
                Collections.sort(mg.getSubModules(), cm);
            }
            Collections.sort(mgList, cm2);

            //AppConfig
            config.setModuleList(mgList);
        }

        return config;

    }


    /****************** compare func **************************/
    static class compareModuleByIndex implements Comparator<Module> {
        @Override
        public int compare(Module o1, Module o2) {
            int o1index = Integer.valueOf(o1.getConfig().getProperty("index", "0"));
            int o2index = Integer.valueOf(o2.getConfig().getProperty("index", "0"));
            if(o1index > o2index){
                return 1;
            }else{
                return -1;
            }
        }
    }

    static class compareModuleGroupByIndex implements Comparator<ModuleGroup> {
        @Override
        public int compare(ModuleGroup o1, ModuleGroup o2) {
            int o1index = Integer.valueOf(o1.getConfig().getProperty("index", "0"));
            int o2index = Integer.valueOf(o2.getConfig().getProperty("index", "0"));
            if(o1index > o2index){
                return 1;
            }else{
                return -1;
            }
        }
    }
}
