package com.windturbines.dataserver.business.rules;

import com.windturbines.dataserver.common.constants.Messages;
import com.windturbines.dataserver.core.exceptions.BusinessException;
import com.windturbines.dataserver.repository.WindTurbineRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WindTurbineBusinessRules
{
    private final WindTurbineRepository repository;

    public void checkIfWindTurbineExists(int id)
    {
        if(!repository.existsById(id))
        {
            throw new BusinessException(Messages.WindTurbine.NotExists);
        }
    }
}
