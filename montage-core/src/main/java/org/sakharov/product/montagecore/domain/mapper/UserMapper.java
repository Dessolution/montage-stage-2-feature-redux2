package org.sakharov.product.montagecore.domain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import org.mapstruct.MappingTarget;
import org.sakharov.product.montagecore.domain.dto.ProfileDto;
import org.sakharov.product.montagecore.domain.dto.UpdateProfileDto;
import org.sakharov.product.montagecore.domain.entity.ClientInfoEntity;
import org.sakharov.product.montagecore.domain.entity.OrderEntity;
import org.sakharov.product.montagecore.domain.entity.WorkerInfoEntity;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "name", target = "userName")
    @Mapping(source = "surname", target = "userSurname")
    @Mapping(source = "email", target = "userEmail")
    @Mapping(source = "messenger", target = "userMessenger")
    @Mapping(source = "channel", target = "userChannel")
    @Mapping(source = "description", target = "userDescription")
    ProfileDto toClientProfileInfo(ClientInfoEntity clientInfoEntity);

    @Mapping(source = "name", target = "userName")
    @Mapping(source = "surname", target = "userSurname")
    @Mapping(source = "email", target = "userEmail")
    @Mapping(source = "messenger", target = "userMessenger")
    @Mapping(source = "portfolio", target = "userPortfolio")
    @Mapping(expression = "java(workerInfoEntity.getLanguageUser().getInfo())", target = "userLang")
    @Mapping(expression = "java(workerInfoEntity.getPaymentMethod().getInfo())", target = "userPaymentMethod")
    ProfileDto toWorkerProfileInfo(WorkerInfoEntity workerInfoEntity);

    void updateUserProfileInfo(UpdateProfileDto updateProfileDto,
                               @MappingTarget ClientInfoEntity clientInfoEntity);

    @Mapping(source = "language", target = "languageUser")
    @Mapping(source = "payment", target = "paymentMethod")
    @Mapping(target = "approved", ignore = true)
    void updateWorkerProfileInfo(UpdateProfileDto updateProfileDto,
                                 @MappingTarget WorkerInfoEntity workerInfoEntity);
}
