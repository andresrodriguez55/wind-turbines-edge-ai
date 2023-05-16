package com.windturbines.dataserver.repository;

import com.windturbines.dataserver.entities.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Integer>
{
    List<History> findAllByWindTurbineIdOrderByGeneratedAtDesc(int id);
    List<History> findTop18ByWindTurbineIdOrderByGeneratedAtDesc(int id);

}
