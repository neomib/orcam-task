<script lang="ts">
    import { goto } from "$app/navigation";
    import CircularProgress from "@smui/circular-progress";
    import { Pagination } from "@smui/data-table";
    import IconButton from "@smui/icon-button";
    import List, {
        Graphic,
        Item,
        PrimaryText,
        SecondaryText,
        Text,
    } from "@smui/list";
    import moment from "moment";
    import { onMount } from "svelte";
    import type { User } from "../types/user";
    import { letterToColor } from "../utils";

    let total = 0;
    let users: User[] | null = null;
    let loading = false;// Loading indicator
    let initialLoad = true; // A flag for "initial load", used to prevent unnecessary fetches
    let rowsPerPage = 10;
    let currentPage = 0;
    let usersPerPage: Record<number, User[]> = {};

    $: start = currentPage * rowsPerPage;
    $: end = Math.min(start + rowsPerPage, total);
    $: lastPage = Math.max(Math.ceil(total / rowsPerPage) - 1, 0);

    $: if (currentPage > lastPage) {
        currentPage = lastPage;
    }

    $: if (!initialLoad) {
        loadUsers(currentPage);
    }

    onMount(() => {
        loading = true;
        loadUsers(0);
        initialLoad = false;
    });

    async function loadUsers(page: number) {
        if (usersPerPage[page]) {
            users = usersPerPage[page];
            return;
        }
        loading = true;
        users = users ? [] : null;
        const usersRes = await fetch(
            `https://admin.dev.orcam.io/api/v8/users?page=${page}&size=10&sort=email:asc`,
            {
                headers: {
                    Authorization:
                        "accessKey d5797433-f9e0-4c83-aba4-58cd1e3bab4a",
                },
            }
        );

        loading = false;
        if (usersRes.status === 200) {
            const result = await usersRes.json();

            users = result.items;
            total = result.total;
            usersPerPage[page] = result.items;
        } else {
            users = null;
            total = 0;
        }
    }
</script>

<div class="inner-container">
    <div
        class="mdc-typography--headline4 users-title"
        style="padding-left: 16px"
    >
        Users
    </div>

    <div class="list-container">
        {#if loading}
            <div class="center">
                <CircularProgress
                    color="secondary"
                    style="height: 32px; width: 32px;"
                    indeterminate
                />
            </div>
        {/if}
        {#if !loading && users}
            <List twoLine avatarList>
                {#each users as item, i}
                    <Item
                        color="secondary"
                        on:SMUI:action={() => goto(`user/${item.userId}`)}
                    >
                        <Graphic
                            style={`background-image: url(https://placehold.co/40x40/${letterToColor(
                                (item.firstName || item.email)[0]
                            )}/white?text=${(item.firstName
                                ? [item.firstName, item.lastName || ""]
                                : [item.email]
                            )
                                .map((val) => val.substring(0, 1).toUpperCase())
                                .join("")});`}
                        />
                        <Text>
                            <PrimaryText
                                >{item.firstName
                                    ? `${item.firstName} ${item.lastName || ""}`
                                    : item.email}</PrimaryText
                            >
                            <SecondaryText
                                >{moment(item.createdAt).format(
                                    "MMM Do YY"
                                )}</SecondaryText
                            >
                            {#if item.role !== null}
                                <SecondaryText>{item.role}</SecondaryText>
                            {/if}
                        </Text>
                    </Item>
                {/each}
            </List>
        {/if}
    </div>
    {#if users}
        <Pagination slot="paginate">
            <svelte:fragment slot="total">
                {start + 1}-{end} of {total}
            </svelte:fragment>

            <!-- <IconButton
                class="material-icons"
                action="first-page"
                title="First page"
                on:click={() => (currentPage = 0)}
                disabled={currentPage === 0}>first_page</IconButton
            > -->
            <IconButton
                class="material-icons"
                action="prev-page"
                title="Prev page"
                on:click={() => {
                    currentPage--;
                }}
                disabled={currentPage === 0}>chevron_left</IconButton
            >
            <IconButton
                class="material-icons"
                action="next-page"
                title="Next page"
                on:click={() => currentPage++}
                disabled={currentPage === lastPage}>chevron_right</IconButton
            >
            <!-- <IconButton
                class="material-icons"
                action="last-page"
                title="Last page"
                on:click={() => (currentPage = lastPage)}
                disabled={currentPage === lastPage}>last_page</IconButton
            > -->
        </Pagination>
    {/if}
</div>

<style lang="scss">
    @use "@material/typography/mdc-typography";
    .inner-container {
        padding: 16px 16px;
        background: #f8f8f8;
        border-radius: 4px;
        min-width: 40vw;
    }
    .list-container {
        overflow: auto;
        margin-top: 24px;
        height: calc(100vh - 64px - 32px - 150px);
    }
    .center {
        display: flex;
        justify-content: center;
    }

    @media screen and (max-width: 600px) {
        .list-container {
            height: calc(100vh - 56px - 32px - 150px);
        }
    }
    /** Scroll Bar **/
    /* width */
    ::-webkit-scrollbar {
        width: 6px;
        height: 9px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #e8ecf0;
        border-radius: 100px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #c1c3c5;
    }
</style>
