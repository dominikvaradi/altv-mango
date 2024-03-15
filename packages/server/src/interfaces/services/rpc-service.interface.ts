import type { RPCCallOptions, RPCResult, ScriptRPCHandler } from '@altv-mango/core';
import type { RPC as ServerRPC, Player } from '@altv/server';
import type { RPC as SharedRPC } from '@altv/shared';

export interface RPCService {
    call<E extends keyof ServerRPC.CustomServerRPC>(
        rpcName: E,
        body?: Parameters<ServerRPC.CustomServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<ServerRPC.CustomServerRPC[E]>>>;
    call<E extends string>(
        rpcName: Exclude<E, keyof ServerRPC.CustomServerRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult<unknown>>;
    onRequest<E extends keyof ServerRPC.CustomServerRPC>(
        rpcName: E,
        handler: (body: Parameters<ServerRPC.CustomServerRPC[E]>[0]) => ReturnType<ServerRPC.CustomServerRPC[E]>,
    ): ScriptRPCHandler;
    onRequest<E extends string>(
        rpcName: Exclude<E, keyof ServerRPC.CustomServerRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callPlayer<E extends keyof SharedRPC.CustomServerToClientRPC, U extends Player>(
        player: U,
        rpcName: E,
        body?: Parameters<SharedRPC.CustomServerToClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<SharedRPC.CustomServerToClientRPC[E]>>>;
    callPlayer<E extends string, U extends Player>(
        player: U,
        rpcName: Exclude<E, keyof SharedRPC.CustomServerToClientRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onPlayerRequest<E extends keyof SharedRPC.CustomClientToServerRPC, U extends Player>(
        rpcName: E,
        handler: (sender: U, body: Parameters<SharedRPC.CustomClientToServerRPC[E]>[0]) => ReturnType<SharedRPC.CustomClientToServerRPC[E]>,
    ): ScriptRPCHandler;
    onPlayerRequest<E extends string, U extends Player>(
        rpcName: Exclude<E, keyof SharedRPC.CustomClientToServerRPC>,
        handler: (sender: U, body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callWebView<E extends keyof SharedRPC.CustomServerToWebViewRPC, U extends Player>(
        player: U,
        id: string | number,
        rpcName: E,
        body?: Parameters<SharedRPC.CustomServerToWebViewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<SharedRPC.CustomServerToWebViewRPC[E]>>>;
    callWebView<E extends string, U extends Player>(
        player: U,
        id: string | number,
        rpcName: Exclude<E, keyof SharedRPC.CustomServerToWebViewRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onWebViewRequest<E extends string, U extends Player>(
        id: string | number,
        rpcName: Exclude<E, keyof SharedRPC.CustomWebViewToServerRPC>,
        handler: (player: U, body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    onWebViewRequest<E extends keyof SharedRPC.CustomWebViewToServerRPC, U extends Player>(
        id: string | number,
        rpcName: E,
        handler: (
            player: U,
            body: Parameters<SharedRPC.CustomWebViewToServerRPC[E]>[0],
        ) => ReturnType<SharedRPC.CustomWebViewToServerRPC[E]>,
    ): ScriptRPCHandler;
}
