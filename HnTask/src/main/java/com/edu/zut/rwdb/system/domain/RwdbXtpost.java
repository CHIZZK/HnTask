package com.edu.zut.rwdb.system.domain;

public class RwdbXtpost {

  private String postid;
  private String postname;
  private String stopflag;
  private String gid;
  private java.sql.Date cjsj;


  public String getPostid() {
    return postid;
  }

  public void setPostid(String postid) {
    this.postid = postid;
  }


  public String getPostname() {
    return postname;
  }

  public void setPostname(String postname) {
    this.postname = postname;
  }


  public String getStopflag() {
    return stopflag;
  }

  public void setStopflag(String stopflag) {
    this.stopflag = stopflag;
  }


  public String getGid() {
    return gid;
  }

  public void setGid(String gid) {
    this.gid = gid;
  }


  public java.sql.Date getCjsj() {
    return cjsj;
  }

  public void setCjsj(java.sql.Date cjsj) {
    this.cjsj = cjsj;
  }

}
