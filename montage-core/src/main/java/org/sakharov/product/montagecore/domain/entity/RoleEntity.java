package org.sakharov.product.montagecore.domain.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Entity
@Table(name = "roles_info")
@Getter
@Setter
public class RoleEntity extends BaseEntity implements GrantedAuthority {
  @Column(name = "name")
  private String name;
  @ManyToMany(mappedBy = "roles", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
  private List<UserEntity> users;
  @Override
  public String getAuthority() {
    return this.name;
  }
}
