package com.windturbines.dataserver.business.dto.responses.get;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GetAllHistoryResponse
{
    private int id;
    private int windTurbineId;
    private LocalDateTime generatedAt;
    private Integer state;

    private double wecMinRotation;
    private double sys1Inverter3CabinetTemp;
    private double sys1Inverter6CabinetTemp;
    private double sys2Inverter3CabinetTemp;
    private double sys2Inverter4CabinetTemp;
    private double sys2Inverter7CabinetTemp;
    private double pitchCabinetBladeBTemp;
    private double nacelleAmbientTemp1; //????????????
    private double yawInverterCabinetTemp;
    private double controlCabinetTemp;
}
