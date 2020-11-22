package com.edu.zut.rwdb.system.mapper;

import com.edu.zut.rwdb.system.utils.AjaxResult;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ZzglMapper {
   void savaData(String gid, int yhdm, String sjzz, String zzmc, String zzbh, String zzjc, int zzbz, int dcdw);

    List<Map> findData();

    void updateData(String gid, String zzmc, String zzbh, String zzjc, Integer dcdw);

    void stopData(String gid);
}