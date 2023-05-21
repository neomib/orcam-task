<script lang="ts">
    import { goto } from "$app/navigation";
    import TopAppBar, { Row, Section } from "@smui/top-app-bar";
</script>

<TopAppBar variant="static" color={"secondary"}>
    <Row>
        <Section>
            <div
                class="link-text"
                on:click={() => goto("/")}
                on:keypress={() => {}}
            >
                SAMPLE APP
            </div>
        </Section>
        <Section align="end" toolbar>
            <div
                class="link-text"
                on:click={() => goto("/about")}
                on:keypress={() => {}}
            >
                About
            </div>
        </Section>
    </Row>
</TopAppBar>
<div class="container">
    <slot />
</div>

<style lang="scss">
    .container {
        padding: 16px 8px 16px 8px;
    }
    @media screen and (min-width: 992px) {
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
    .link-text {
        font-family: var(
            --mdc-text-button-label-text-font,
            var(
                --mdc-typography-button-font-family,
                var(--mdc-typography-font-family, Roboto, sans-serif)
            )
        );
        font-size: var(
            --mdc-text-button-label-text-size,
            var(--mdc-typography-button-font-size, 0.875rem)
        );
        letter-spacing: var(
            --mdc-text-button-label-text-tracking,
            var(--mdc-typography-button-letter-spacing, 0.0892857143em)
        );

        font-weight: var(
            --mdc-text-button-label-text-weight,
            var(--mdc-typography-button-font-weight, 500)
        );
        /* text-transform: uppercase; */
        height: var(--mdc-text-button-container-height, 36px);
        display: flex;
        align-items: center;
        cursor: pointer;
    }
</style>
