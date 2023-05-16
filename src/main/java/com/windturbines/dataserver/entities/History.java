package com.windturbines.dataserver.entities;

import com.windturbines.dataserver.entities.enums.State;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "history")
public class History
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "wind_turbine_id")
    private WindTurbine windTurbine;
    @Column(name = "generated_at")
    private LocalDateTime generatedAt;
    @Column(name = "state")
    //@Enumerated(EnumType.STRING)
    private Integer state;

    @Column(name = "wec_ava_windspeed")
    private Double wecAvaWindspeed;
    @Column(name = "wec_max_windspeed")
    private Double wecMaxWindspeed;
    @Column(name = "wec_min_windspeed")
    private Double wecMinWindspeed;
    @Column(name = "wec_ava_rotation")
    private Double wecAvaRotation;
    @Column(name = "wec_max_rotation")
    private Double wecMaxRotation;
    @Column(name = "wec_min_rotation")
    private Double wecMinRotation;
    @Column(name = "wec_ava_power")
    private Double wecAvaPower;
    @Column(name = "wec_max_power")
    private Double wecMaxPower;
    @Column(name = "wec_min_power")
    private Double wecMinPower;
    @Column(name = "wec_ava_nacel_position_including_cable_twisting")
    private Double wecAvaNacelPositionIncludingCableTwisting;
    @Column(name = "wec_operating_hours")
    private Double wecOperatingHours;
    @Column(name = "wec_production_kwh")
    private Double wecProductionKwh;
    @Column(name = "wec_production_minutes")
    private Double wecProductionMinutes;
    @Column(name = "wec_ava_reactive_power")
    private Double wecAvaReactivePower;
    @Column(name = "wec_max_reactive_power")
    private Double wecMaxReactivePower;
    @Column(name = "wec_min_reactive_power")
    private Double wecMinReactivePower;
    @Column(name = "wec_ava_available_p_from_wind")
    private Double wecAvaAvailablePFromWind;
    @Column(name = "wec_ava_available_p_technical_reasons")
    private Double wecAvaAvailablePTechnicalReasons;
    @Column(name = "wec_ava_available_p_force_majeure_reasons")
    private Double wecAvaAvailablePForceMajeureReasons;
    @Column(name = "wec_ava_blade_angle_a")
    private Double wecAvaBladeAngleA;
    @Column(name = "sys_1_inverter_1_cabinet_temp")
    private Double sys1Inverter1CabinetTemp;
    @Column(name = "sys_1_inverter_2_cabinet_temp")
    private Double sys1Inverter2CabinetTemp;
    @Column(name = "sys_1_inverter_3_cabinet_temp")
    private Double sys1Inverter3CabinetTemp;
    @Column(name = "sys_1_inverter_4_cabinet_temp")
    private Double sys1Inverter4CabinetTemp;
    @Column(name = "sys_1_inverter_5_cabinet_temp")
    private Double sys1Inverter5CabinetTemp;
    @Column(name = "sys_1_inverter_6_cabinet_temp")
    private Double sys1Inverter6CabinetTemp;
    @Column(name = "sys_1_inverter_7_cabinet_temp")
    private Double sys1Inverter7CabinetTemp;
    @Column(name = "sys_2_inverter_1_cabinet_temp")
    private Double sys2Inverter1CabinetTemp;
    @Column(name = "sys_2_inverter_2_cabinet_temp")
    private Double sys2Inverter2CabinetTemp;
    @Column(name = "sys_2_inverter_3_cabinet_temp")
    private Double sys2Inverter3CabinetTemp;
    @Column(name = "sys_2_inverter_4_cabinet_temp")
    private Double sys2Inverter4CabinetTemp;
    @Column(name = "sys_2_inverter_5_cabinet_temp")
    private Double sys2Inverter5CabinetTemp;
    @Column(name = "sys_2_inverter_6_cabinet_temp")
    private Double sys2Inverter6CabinetTemp;
    @Column(name = "sys_2_inverter_7_cabinet_temp")
    private Double sys2Inverter7CabinetTemp;
    @Column(name="spinner_temp")
    private Double spinnerTemp;
    @Column(name="front_bearing_temp")
    private Double frontBearingTemp;
    @Column(name="rear_bearing_temp")
    private Double rearBearingTemp;
    @Column(name="pitch_cabinet_blade_a_temp")
    private Double pitchCabinetBladeATemp;
    @Column(name="pitch_cabinet_blade_b_temp")
    private Double pitchCabinetBladeBTemp;
    @Column(name="pitch_cabinet_blade_c_temp")
    private Double pitchCabinetBladeCTemp;
    @Column(name="blade_a_temp")
    private Double bladeATemp;
    @Column(name="blade_b_temp")
    private Double bladeBTemp;
    @Column(name="blade_c_temp")
    private Double bladeCTemp;
    @Column(name="rotor_temp_1")
    private Double rotorTemp1;
    @Column(name="rotor_temp_2")
    private Double rotorTemp2;
    @Column(name="stator_temp_1")
    private Double statorTemp1;
    @Column(name="stator_temp_2")
    private Double statorTemp2;
    @Column(name="nacelle_ambient_temp_1")
    private Double nacelleAmbientTemp1;
    @Column(name="nacelle_ambient_temp_2")
    private Double nacelleAmbientTemp2;
    @Column(name="nacelle_temp")
    private Double nacelleTemp;
    @Column(name="nacelle_cabinet_temp")
    private Double nacelleCabinetTemp;
    @Column(name="main_carrier_temp")
    private Double mainCarrierTemp;
    @Column(name="rectifier_cabinet_temp")
    private Double rectifierCabinetTemp;
    @Column(name="yaw_inverter_cabinet_temp")
    private Double yawInverterCabinetTemp;
    @Column(name="fan_inverter_cabinet_temp")
    private Double fanInverterCabinetTemp;
    @Column(name="ambient_temp")
    private Double ambientTemp;
    @Column(name="tower_temp")
    private Double towerTemp;
    @Column(name="control_cabinet_temp")
    private Double controlCabinetTemp;
    @Column(name="transformer_temp")
    private Double transformerTemp;
    @Column(name="rtu_ava_setpoint_1")
    private Double rtuAvaSetpoint1;
    @Column(name="inverter_averages")
    private Double inverterAverages;
    @Column(name="inverter_std_dev")
    private Double inverterStdDev;
}


/*
* package com.windturbines.dataserver.entities;

import com.windturbines.dataserver.entities.enums.State;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "history")
public class History
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "wind_turbine_id")
    private WindTurbine windTurbine;
    @Column(name = "time")
    private LocalDateTime generatedAt;
    //@Enumerated(EnumType.STRING)
    private Integer state; //State

    private Double wecAvaWindspeed;
    private Double wecMaxWindspeed;
    private Double wecMinWindspeed;
    private Double wecAvaRotation;
    private Double wecMaxRotation;

    private Double wecMinRotation;
    private Double wecAvaPower;
    private Double wecMaxPower;
    private Double wecMinPower;
    private Double wecAvaNacelPositionIncludingCableTwisting;
    private Double wecOperatingHours;
    private Double wecProductionKwh;
    private Double wecProductionMinutes;
    private Double wecAvaReactivePower;
    private Double wecMaxReactivePower;
    private Double wecMinReactivePower;
    private Double wecAvaAvailablePFromWind;
    private Double wecAvaAvailablePTechnicalReasons;
    private Double wecAvaAvailablePForceMajeureReasons;
    private Double wecAvaBladeAngleA;
    private Double sys1Inverter1CabinetTemp;
    private Double sys1Inverter2CabinetTemp;
    private Double sys1Inverter3CabinetTemp;
    private Double sys1Inverter4CabinetTemp;
    private Double sys1Inverter5CabinetTemp;
    private Double sys1Inverter6CabinetTemp;
    private Double sys1Inverter7CabinetTemp;
    private Double sys2Inverter1CabinetTemp;
    private Double sys2Inverter2CabinetTemp;
    private Double sys2Inverter3CabinetTemp;
    private Double sys2Inverter4CabinetTemp;
    private Double sys2Inverter5CabinetTemp;
    private Double sys2Inverter6CabinetTemp;
    private Double sys2Inverter7CabinetTemp;
    private Double spinnerTemp;
    private Double frontBearingTemp;
    private Double rearBearingTemp;
    private Double pitchCabinetBladeATemp;
    private Double pitchCabinetBladeBTemp;
    private Double pitchCabinetBladeCTemp;
    private Double bladeATemp;
    private Double bladeBTemp;
    private Double bladeCTemp;
    private Double rotorTemp1;
    private Double rotorTemp2;
    private Double statorTemp1;
    private Double statorTemp2;
    private Double nacelleAmbientTemp1;
    private Double nacelleAmbientTemp2;
    private Double nacelleTemp;
    private Double nacelleCabinetTemp;
    private Double mainCarrierTemp;
    private Double rectifierCabinetTemp;
    private Double yawInverterCabinetTemp;
    private Double fanInverterCabinetTemp;
    private Double ambientTemp;
    private Double towerTemp;
    private Double controlCabinetTemp;
    private Double transformerTemp;
    private Double rtuAvaSetpoInteger1;
    private Double inverterAverages;
    private Double inverterStdDev;
}
* */