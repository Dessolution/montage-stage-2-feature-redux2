package org.sakharov.product.montagecore.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkerContactDto {

    private String userName;
    private String userSurname;
    private String userEmail;
    private String messenger;
}
