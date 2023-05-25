package com.windturbines.dataserver.business.dto.requests.update;

import com.windturbines.dataserver.entities.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UpdateWindTurbineRequest
{
    private Double latitude;
    private Double longitude;
    private Status status;
}
