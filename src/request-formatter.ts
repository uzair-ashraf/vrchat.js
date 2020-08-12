export class RequestFormatter {
  public static formatQuery(url: string, config: object): string {
    for (const queryParam in config) {
      url += `&${queryParam}=${config[queryParam as keyof object]}`
    }
    return url
  }
}
