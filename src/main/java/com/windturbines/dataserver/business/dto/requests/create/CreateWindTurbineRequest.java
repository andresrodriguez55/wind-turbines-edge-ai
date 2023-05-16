package com.windturbines.dataserver.business.dto.requests.create;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CreateWindTurbineRequest
{
    private Double latitude;
    private Double longitude;
}
