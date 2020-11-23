package com.edu.zut.rwdb.system.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SzjsMapper {
   void savaData(String gid, String jsmc, String jsbh);

    List<Map> findData();

    void updateData(String gid, String jsmc);

    void stopData(String gid,int stopflag);
}