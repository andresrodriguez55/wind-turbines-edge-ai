package com.windturbines.dataserver.api.controllers;

import com.windturbines.dataserver.business.abstracts.WindTurbineService;
import com.windturbines.dataserver.business.dto.requests.create.CreateWindTurbineRequest;
import com.windturbines.dataserver.business.dto.responses.create.CreateWindTurbineResponse;
import com.windturbines.dataserver.business.dto.responses.get.GetAllWindTurbineResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/windturbines")
@AllArgsConstructor
public class WindTurbinesController
{
    private final WindTurbineService service;

    @GetMapping
    public List<GetAllWindTurbineResponse> getAll()
    {
        return service.getAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CreateWindTurbineResponse add(@RequestBody CreateWindTurbineRequest request)
    {
        return service.add(request);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable("id") int id)
    {
        service.delete(id);
    }
}
