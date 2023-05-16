package com.windturbines.dataserver.business.concretes;

import com.windturbines.dataserver.business.abstracts.HistoryService;
import com.windturbines.dataserver.business.dto.responses.get.GetAllHistoryResponse;
import com.windturbines.dataserver.business.rules.HistoryBusinessRules;
import com.windturbines.dataserver.entities.History;
import com.windturbines.dataserver.repository.HistoryRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service //once time of creation?
@AllArgsConstructor
public class HistoryManager implements HistoryService
{
    private final HistoryRepository repository;
    private final ModelMapper mapper;
    private final HistoryBusinessRules rules;

    @Override
    public List<GetAllHistoryResponse> getAllByWindTurbineIdOrderByGeneratedAtDesc(int id, boolean findTop18)
    {
        List<History> histories;
        if(findTop18)
        {
            histories = repository.findTop18ByWindTurbineIdOrderByGeneratedAtDesc(id);
        }
        else
        {
            histories = repository.findAllByWindTurbineIdOrderByGeneratedAtDesc(id);
        }
        List<GetAllHistoryResponse> responses = histories
                .stream().map(history -> mapper.map(history, GetAllHistoryResponse.class)).toList();
        return responses;
    }
}
