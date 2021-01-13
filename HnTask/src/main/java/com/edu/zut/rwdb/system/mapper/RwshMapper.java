package com.edu.zut.rwdb.system.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface RwshMapper {
    List<Map> findData(String yhdm);

    List<Map> findUserRole(String yhdm);

    void updateRwzt(String gid, int rwzt);
}