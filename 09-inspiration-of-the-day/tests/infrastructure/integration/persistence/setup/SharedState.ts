import {StartedMariaDbContainer} from "@testcontainers/mariadb";
import {StartedNetwork} from "testcontainers";

export class SharedState {

    static create(startedDbContainer: StartedMariaDbContainer, startedNetwork: StartedNetwork, dbConfig: any): void {
        const myGlobal = globalThis as any;
        myGlobal.__SHOPPING_CART__ = {
            dbContainer: startedDbContainer,
            networkContainer: startedNetwork,
            dbConfig: Object.assign({}, dbConfig, {
                port: startedDbContainer.getMappedPort(dbConfig.port),
            })
        };
    }

    static getDbConfig(): { host: string; port: number; database: string; user: string; password: string } {
        return this.getGlobalState().dbConfig;
    }

    static getStartedDbContainer(): StartedMariaDbContainer {
        return this.getGlobalState().dbContainer;
    }

    static getStartedNetworkContainer(): StartedNetwork {
        return this.getGlobalState().networkContainer;
    }

    static reset(): void {
        delete (globalThis as any).__SHOPPING_CART__;
    }

    private static getGlobalState(): any {
        return (globalThis as any).__SHOPPING_CART__;
    }
}