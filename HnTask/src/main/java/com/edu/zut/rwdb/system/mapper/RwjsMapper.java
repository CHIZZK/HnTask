package com.edu.zut.rwdb.system.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface RwjsMapper {
    List<Map> findUserRole(String yhdm);

    List<Map> findData(String yhdm, String gznr, String kssj, String jssj);
}