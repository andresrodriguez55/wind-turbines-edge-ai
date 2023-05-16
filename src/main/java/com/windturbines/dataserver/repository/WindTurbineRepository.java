package com.windturbines.dataserver.repository;

import com.windturbines.dataserver.entities.WindTurbine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WindTurbineRepository extends JpaRepository<WindTurbine, Integer>
{
}
