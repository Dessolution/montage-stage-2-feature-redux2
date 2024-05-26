package org.sakharov.product.montagecore.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Entity
@Table(name = "user_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity extends BaseEntity implements UserDetails {
  @Column(name = "name")
  private String name;
  @Column(name = "password")
  private String password;

  @Column(name = "blocked")
  private Boolean blocked;

  @OneToOne(cascade =
          {CascadeType.PERSIST, CascadeType.MERGE,CascadeType.REFRESH},
          mappedBy = "user")
  private ClientInfoEntity client;

  @OneToOne(cascade =
          {CascadeType.PERSIST, CascadeType.MERGE,CascadeType.REFRESH},
          mappedBy = "user")
  private WorkerInfoEntity worker;
  @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.REFRESH})
  @JoinTable(
      name = "user_roles",
      joinColumns = @JoinColumn(
          name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(
          name = "role_id", referencedColumnName = "id"))
  private List<RoleEntity> roles;

//  @OneToMany(mappedBy = "user")
//  private List<OrderEntity> orders;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return roles;
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.name;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public ClientInfoEntity getClientInfo() { return this.client;}

  public WorkerInfoEntity getWorkerInfo() { return this.worker;}

}
