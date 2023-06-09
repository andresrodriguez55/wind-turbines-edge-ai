package com.windturbines.dataserver.business.dto.responses.get;

import com.windturbines.dataserver.entities.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GetAllWindTurbineResponse
{
    private int id;
    private double latitude;
    private double longitude;
    private Status status;
}
