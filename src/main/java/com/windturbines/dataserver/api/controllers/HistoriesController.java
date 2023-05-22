package com.windturbines.dataserver.api.controllers;

import com.windturbines.dataserver.business.abstracts.HistoryService;
import com.windturbines.dataserver.business.dto.responses.get.GetAllHistoryResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/histories")
@AllArgsConstructor
public class HistoriesController
{
    private final HistoryService service;

    @GetMapping(path = "/windturbine/{id}")
    public List<GetAllHistoryResponse> getAll(@PathVariable("id") Integer id,
                                              @RequestParam(defaultValue = "true") boolean findTop18)
    {
        return service.getAllByWindTurbineIdOrderByGeneratedAtDesc(id, findTop18);
    }
}
