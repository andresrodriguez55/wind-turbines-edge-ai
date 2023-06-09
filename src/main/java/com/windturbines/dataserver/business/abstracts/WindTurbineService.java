package com.windturbines.dataserver.business.abstracts;

import com.windturbines.dataserver.business.dto.requests.create.CreateWindTurbineRequest;
import com.windturbines.dataserver.business.dto.requests.update.UpdateWindTurbineRequest;
import com.windturbines.dataserver.business.dto.responses.create.CreateWindTurbineResponse;
import com.windturbines.dataserver.business.dto.responses.get.GetAllWindTurbineResponse;
import com.windturbines.dataserver.business.dto.responses.update.UpdateWindTurbineResponse;

import java.util.List;

public interface WindTurbineService
{
    List<GetAllWindTurbineResponse> getAll();
    CreateWindTurbineResponse add(CreateWindTurbineRequest request);
    UpdateWindTurbineResponse update(int id, UpdateWindTurbineRequest request);
    void delete(int id);
}
