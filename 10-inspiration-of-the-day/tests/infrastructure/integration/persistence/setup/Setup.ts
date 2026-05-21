import {GenericContainer, Network, StartedNetwork, Wait} from "testcontainers";
import {MariaDbContainer, StartedMariaDbContainer} from "@testcontainers/mariadb";
import {SharedState} from "./SharedState";

const dbConfigInsideContainer = {
    host: "localhost",
    port: 3306,
    database: "shopping_cart",
    user: "test",
    password: "password"
};

export default async function globalSetup() {
    console.log("\nStarting containers...");
    const startTime = Date.now();
    const startedNetwork = await new Network().start();
    const dbNetworkAliases = "db";
    const startedDbContainer = await startDbContainer(startedNetwork, dbNetworkAliases);
    await runDbMigrations(dbNetworkAliases, startedNetwork);

    const endTime = Date.now();
    console.log(`\nContainers start took ${(endTime - startTime) / 1000} seconds...\n`);
    SharedState.create(startedDbContainer, startedNetwork, dbConfigInsideContainer);
}

async function startDbContainer(startedNetwork: StartedNetwork, dbNetworkAliases: string): Promise<StartedMariaDbContainer> {
    return await new MariaDbContainer("mariadb:11.7")
        .withNetwork(startedNetwork)
        .withNetworkAliases(dbNetworkAliases)
        .withUsername(dbConfigInsideContainer.user)
        .withUserPassword(dbConfigInsideContainer.password)
        .withDatabase(dbConfigInsideContainer.database)
        .withExposedPorts(dbConfigInsideContainer.port)
        .start();
}

async function runDbMigrations(dbNetworkAliases: string, network: StartedNetwork): Promise<void> {
    const migrationContainer = await new GenericContainer("flyway/flyway:latest")
        .withCommand([
            `-url=jdbc:mariadb://${dbNetworkAliases}:${dbConfigInsideContainer.port}/${dbConfigInsideContainer.database}`,
            `-user=${dbConfigInsideContainer.user}`,
            `-password=${dbConfigInsideContainer.password}`,
            "migrate",
        ])
        .withBindMounts([
            {
                source: `${process.cwd()}/migrations`,
                target: "/flyway/sql",
            },
        ])
        .withNetwork(network)
        .withWaitStrategy(Wait.forOneShotStartup())
        .start();
    await migrationContainer.stop();
}