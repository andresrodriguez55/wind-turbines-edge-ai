package com.windturbines.dataserver.entities;

import com.windturbines.dataserver.entities.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "wind_turbine")
public class WindTurbine
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Double latitude;
    private Double longitude;
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;
    //status
    @OneToMany(mappedBy = "windTurbine")
    private List<History> histories;
}
