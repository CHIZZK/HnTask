package com.edu.zut.rwdb.system.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SzyhMapper {

    void savaYhxx(String gid, int yhdm, String yhmc, String xsmc, String salt,
                  String javamm, String email, String Movetel, String gldw);

    void savaUnitdept(String gid, int yhdm, String gldw, String dybm);

    List<Map> findData();

    void updateYhxx(String gid, String xsmc, String email, String tel, String gldw);

    void updateUnitdept(String yhdm, String dybm);

    void stopData(String gid, Integer stoped);

    List<Map> findGldw();

    List<Map> findDybm(String compid);

    void resetPwd(String gid, String salt, String epwd);

    List<Map> findYhjs(String yhdm);

    void deletePostByYhdm(String yhdm);

    void savePost(String gid, String postid, String yhdm);
}