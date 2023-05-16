package com.windturbines.dataserver.business.rules;

import com.windturbines.dataserver.common.constants.Messages;
import com.windturbines.dataserver.core.exceptions.BusinessException;
import com.windturbines.dataserver.repository.HistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class HistoryBusinessRules
{
    private final HistoryRepository repository;

    public void checkIfHistoryExists(int id)
    {
        if(!repository.existsById(id))
        {
            throw new BusinessException(Messages.History.NotExists);
        }
    }
}
