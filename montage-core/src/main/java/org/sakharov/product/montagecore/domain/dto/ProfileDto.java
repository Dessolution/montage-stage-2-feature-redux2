package org.sakharov.product.montagecore.domain.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sakharov.product.montagecore.domain.enums.LanguageUser;
import org.sakharov.product.montagecore.domain.enums.PaymentMethod;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {

    private String userName;
    private String userSurname;
    private String userEmail;
    private String userPassword;
    private String userMessenger;
    private String userChannel;
    private String userDescription;
    private String userPortfolio;
    private String userLang;
    private String userPaymentMethod;
}
