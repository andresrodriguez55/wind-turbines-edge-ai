package com.windturbines.dataserver.business.concretes;

import com.windturbines.dataserver.business.abstracts.WindTurbineService;
import com.windturbines.dataserver.business.dto.requests.create.CreateWindTurbineRequest;
import com.windturbines.dataserver.business.dto.requests.update.UpdateWindTurbineRequest;
import com.windturbines.dataserver.business.dto.responses.create.CreateWindTurbineResponse;
import com.windturbines.dataserver.business.dto.responses.get.GetAllWindTurbineResponse;
import com.windturbines.dataserver.business.dto.responses.update.UpdateWindTurbineResponse;
import com.windturbines.dataserver.business.rules.WindTurbineBusinessRules;
import com.windturbines.dataserver.entities.WindTurbine;
import com.windturbines.dataserver.entities.enums.Status;
import com.windturbines.dataserver.repository.WindTurbineRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service //once time of creation?
@AllArgsConstructor
public class WindTurbineManager implements WindTurbineService
{
    private final WindTurbineRepository repository;
    private final ModelMapper mapper;
    private final WindTurbineBusinessRules rules;

    @Override
    public List<GetAllWindTurbineResponse> getAll()
    {
        List<WindTurbine> windTurbines = repository.findAll();

        List<GetAllWindTurbineResponse> responses = windTurbines
                .stream().map(windTurbine -> mapper.map(windTurbine, GetAllWindTurbineResponse.class)).toList();
        return responses;
    }

    @Override
    public CreateWindTurbineResponse add(CreateWindTurbineRequest request)
    {
        //check if there is a turbine nearly
        WindTurbine windTurbine = mapper.map(request, WindTurbine.class);
        windTurbine.setId(0);
        windTurbine.setStatus(Status.OFFLINE);
        WindTurbine savedWindTurbine = repository.save(windTurbine);
        CreateWindTurbineResponse response = mapper.map(savedWindTurbine, CreateWindTurbineResponse.class);
        return response;
    }

    @Override
    public UpdateWindTurbineResponse update(int id, UpdateWindTurbineRequest request)
    {
        rules.checkIfWindTurbineExists(id);
        WindTurbine windTurbine = mapper.map(request, WindTurbine.class);
        windTurbine.setId(id);

        WindTurbine savedWindTurbine = repository.save(windTurbine);
        UpdateWindTurbineResponse response = mapper.map(savedWindTurbine, UpdateWindTurbineResponse.class);
        return response;
    }

    @Override
    public void delete(int id)
    {
        rules.checkIfWindTurbineExists(id);
        repository.deleteById(id);
    }
}
