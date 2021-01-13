package com.edu.zut.rwdb.system.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface RwbxMapper {
    List<Map> findData(String yhdm);

    List<Map> findZrzt(String jsmc);

    void savaRwxx(String gid, String cjr, int gzlb, int gzlx, String gznr, String gzbz, String kssj, String jssj);

    void savaZrzt(String gid, String rwid, String zrzt);

    void updateRwxx(String gid, int gzlb, int gzlx, String gznr, String gzbz, String kssj, String jssj);

    void deleteZrzt(String gid);

    void sumitRw(int czzt,String gid,String yhdm);

    List<Map> findUserRole(String yhdm);

    List<Map> findShyh(String jsmc);
}