package com.edu.zut.rwdb.system.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface JxkpMapper {
    List<Map> findData(String yhdm,String wcsx);

    void updateSftj(String gid);

    void saveList(String gid, String rwid, String yhdm, Double pf, String pfr);

    void updateList(String khgid, Double pf);

    List<Map> findJxcxData(String yhdm, String wcsx,String postname, int flag);
}