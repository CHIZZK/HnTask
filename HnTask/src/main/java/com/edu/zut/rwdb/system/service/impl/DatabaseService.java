package com.edu.zut.rwdb.system.service.impl;

import com.edu.zut.rwdb.system.mapper.DatabaseMapper;
import com.edu.zut.rwdb.system.service.IDatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DatabaseService implements IDatabaseService {
    @Autowired
    private DatabaseMapper databaseMapper;
    @Override
    public List<Map> test() {
        return databaseMapper.test();
    }
}
