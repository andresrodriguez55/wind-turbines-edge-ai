package com.windturbines.dataserver.repository;

import com.windturbines.dataserver.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>
{
    User findByEmail(String email);
    boolean existsByEmail(String email);
    void deleteByEmail(String email);
    boolean existsByEmailAndPassword(String email, String password);
}
