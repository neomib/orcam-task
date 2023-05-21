<script lang="ts">
  import { goto } from "$app/navigation";
  import Button, { Icon, Label } from "@smui/button";
  import Card, { Content } from "@smui/card";
  import moment from "moment";

  export let data;
  const { user } = data;
</script>

<div class="inner-container">
  <Button color="secondary"
    style="display:flex;align-items:center;margin-bottom:8px;"
    on:click={() => {
      goto("/");
    }}
  >
    <Icon class="material-icons">arrow_back</Icon>
    <Label style="margin-left:4px">All Users</Label>
  </Button>
  <Card>
    <div style="padding: 1rem;">
      <h2 class="mdc-typography--headline6" style="margin: 0;">
        {user.firstName
          ? `${user.firstName} ${user.lastName || ""}`
          : user.email}
      </h2>
    </div>

    <Content class="mdc-typography--body2">
      <div class="mdc-typography--caption" style="color:darkgray">Email</div>
      <div class="mdc-typography--subtitle1">{user.email}</div>
      {#if user.phone}
        <div class="mdc-typography--caption caption">Phone</div>
        <div class="mdc-typography--subtitle1">{user.phone}</div>
      {/if}
      <div class="mdc-typography--caption caption">Date Joined</div>
      <div class="mdc-typography--subtitle1">
        {moment(user.createdAt).format("MMM Do YY")}
      </div>
      {#if user.role}
        <div class="mdc-typography--caption caption">Role</div>
        <div class="mdc-typography--subtitle1">{user.role}</div>
      {/if}
      {#if user.country}
        <div class="mdc-typography--caption caption">Country</div>
        <div class="mdc-typography--subtitle1">{user.country}</div>
      {/if}
    </Content>
  </Card>
</div>

<style lang="scss">
  @use "@material/typography/mdc-typography";
  .inner-container {
    min-width: 30vw;
  }
  .caption {
    margin-top: 16px;
    color: darkgray;
  }
</style>
