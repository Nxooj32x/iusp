package org.iusp.common.auth;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

/*
  获取用户权限时，使用【|】运算符得到用户权限值，比较用户权限时使用【&】运算符比较用户是否拥有摸个权限。
        如：
        用户A拥有权限：
        权限ID	权限值	权限名称
            1	    1	    查询
            2	    2	    新增
            3	    4	    删除
            4	    8	    更新 权
        限值=2^(权限ID-1)
        用户A的权限值=1|2|4|8=15
        0001
        |0010
        |0100
        |1000
        =1111

        判断用户是否拥有删除权限 15&4!=0
        运算结果
        1111
        &0100
        =0100

        0100=4不等于0，表示有权限。

        若用户权限值=用户A的权限值=1|2|8=11
        0001
        |0010
        |1000
        =1011


        判断用户是否拥有删除权限 11&4!=0
        运算结果
        1011
        &0100
        =0000

        0000=0等于0，表示没有权限。

        查询权限直接判断用户A的权限值==0
*/
public class CustomAuthority {

    public static int GET = 1;

    public static int POST = 2;

    public static int DELETE = 4;

    public static int PUT = 8;


    private int authoritys = 0;

    public int getAuthoritys() {
        return authoritys;
    }

    public static List<GrantedAuthority> getGrantedAuthoritys(int userAnthority){
        List<GrantedAuthority> authList = new ArrayList(4);
        if((userAnthority & GET) != 0){
            authList.add(new SimpleGrantedAuthority("GET"));
        }
        if((userAnthority & POST) != 0){
            authList.add(new SimpleGrantedAuthority("POST"));
        }
        if((userAnthority & DELETE) != 0){
            authList.add(new SimpleGrantedAuthority("DELETE"));
        }
        if((userAnthority & PUT) != 0){
            authList.add(new SimpleGrantedAuthority("PUT"));
        }
        return authList;
    }

    public  CustomAuthority addUserAuthority(int authority ){
        authoritys = authoritys|authority;
        return this;
    }


    public static  void main(String[] args){
        CustomAuthority customAuthority = new CustomAuthority()
                .addUserAuthority(CustomAuthority.GET)
                .addUserAuthority(CustomAuthority.DELETE)
                .addUserAuthority(CustomAuthority.POST);
        int auth = customAuthority.getAuthoritys();
        System.out.println(auth);
        List<GrantedAuthority> grantedAuthoritys = CustomAuthority.getGrantedAuthoritys(auth);
        System.out.println(grantedAuthoritys.toString());
    }
}
