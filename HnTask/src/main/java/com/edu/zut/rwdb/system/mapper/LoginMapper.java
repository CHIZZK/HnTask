package com.edu.zut.rwdb.system.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface LoginMapper {
    String selectYhdm();

    void Userregister(String gid, int yhdm, String yhmc, String salt, String javamm, String xsmc, int usertype);

    int selectYhmc(String yhmc);

    List<Map> selectYhxx(String yhmc);
}