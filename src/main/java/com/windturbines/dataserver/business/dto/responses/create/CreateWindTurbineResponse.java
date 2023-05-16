package com.windturbines.dataserver.business.dto.responses.create;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CreateWindTurbineResponse
{
    private int id;
    private Double latitude;
    private Double longitude;
}
