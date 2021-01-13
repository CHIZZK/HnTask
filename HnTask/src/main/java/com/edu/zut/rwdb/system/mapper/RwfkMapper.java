package com.edu.zut.rwdb.system.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface RwfkMapper {
    List<Map> findUserRole(String yhdm);

    List<Map> findData(String yhdm);

    void updateRwfk(String fkgid,  int sfwc, String wcqksm);

    void saveRwfk(String fkgid, String rwid, int sfwc, String wcqksm, String yhdm);

    void rwfk(String fkgid);
}