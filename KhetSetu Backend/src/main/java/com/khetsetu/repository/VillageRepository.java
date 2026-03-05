package com.khetsetu.repository;

import com.khetsetu.model.Village;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VillageRepository extends JpaRepository<Village, String> {

    @Query("SELECT v FROM Village v WHERE LOWER(v.address) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Village> searchByAddress(@Param("query") String query);
}
