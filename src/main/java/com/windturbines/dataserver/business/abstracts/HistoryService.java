package com.windturbines.dataserver.business.abstracts;

import com.windturbines.dataserver.business.dto.responses.get.GetAllHistoryResponse;

import java.util.List;

public interface HistoryService
{
    List<GetAllHistoryResponse> getAllByWindTurbineIdOrderByGeneratedAtDesc(int id, boolean findTop18);
}
