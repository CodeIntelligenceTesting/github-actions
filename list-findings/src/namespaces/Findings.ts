export interface Findings {
    findings: Finding[];
}

export interface Finding {
    name: string;
    display_name: string;
    fuzz_target: string;
    fuzzing_run: string;
    error_report: ErrorReport;
    timestamp: Date;
    campaign_run: string;
}

export interface ErrorReport {
    type: string;
    logs: string[];
    debugging_info: DebuggingInfo;
    details: string;
    more_details: MoreDetails;
    input_data?: string;
}

export interface DebuggingInfo {
    executable_path: string;
    run_arguments: string[];
    break_points: BreakPoint[];
    environment: Environment[];
}

export interface BreakPoint {
    source_file_path: SourceFilePath;
    location: Location;
    function: string;
}

export interface Location {
    line: number;
    column: number;
}

export enum SourceFilePath {
    SrcConnectionsC = "src/connections.c",
    SrcFdeventC = "src/fdevent.c",
    SrcFdeventLinuxSysepollC = "src/fdevent_linux_sysepoll.c",
    SrcNetworkC = "src/network.c",
    SrcRequestC = "src/request.c",
    SrcServerC = "src/server.c",
}

export interface Environment {
    name: string;
    value: string;
}

export interface MoreDetails {
    id: string;
    name: string;
    description: string;
    severity: Severity;
    mitigation: string;
    links: Link[];
    cwe_details?: CweDetails;
    language: string;
}

export interface CweDetails {
    id: number;
    name: string;
    description: string;
}

export interface Link {
    description: string;
    url: string;
}

export interface Severity {
    description: string;
    score: number;
}
