package org.iusp.common.bean;

public class OrganizationTree {

    private String id;
    private String pid;
    private String name;
    private boolean isParent;

    private TreeFont font;

    /**
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return the pid
     */
    public String getPid() {
        return pid;
    }

    /**
     * @param pid the pid to set
     */
    public void setPid(String pid) {
        this.pid = pid;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the isParent
     */
    public boolean isParent() {
        return isParent;
    }

    /**
     * @param isParent the isParent to set
     */
    public void setParent(boolean isParent) {
        this.isParent = isParent;
    }

    /**
     * @return the font
     */
    public TreeFont getFont() {
        return font;
    }

    /**
     * @param font the font to set
     */
    public void setFont(TreeFont font) {
        this.font = font;
    }

}
