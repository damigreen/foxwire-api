import SystemEntityParam from "App/Models/System/SystemEntityParam";
import WebHookHeader from "App/Models/System/WebHookHeader";
import SystemEvent from "App/Models/System/SystemEvent";
import WebHook from "App/Models/System/WebHook";

export default class Update {
  async handle(
    id: number,
    payload: {
      name?: string;
      url?: string;
      accountId?: number;
      systemEntityId?: number;
      webHookVerbId?: number;
      basicAuthUsername?: string;
      basicAuthPassword?: string;
      systemEventTriggerId?: number;
    },
    request
  ) {
    const { accountId, systemEventTriggerId } = payload;

    const webHook = await WebHook.findOrFail(id);

    for (const key in payload) {
      webHook[key] =
        typeof payload[key] != undefined ? payload[key] : webHook[key];
    }

    await webHook.save();

    const event = await SystemEvent.updateOrCreate(
      { accountId, systemEventTriggerId },
      { accountId, systemEventTriggerId }
    );

    await event.related("hooks").attach([webHook.id]);

    let headersNameRequest = ["header_name"].filter((item) =>
      request.all()[item] ? true : false
    );
    let headersValueRequest = ["header_value"].filter((item) =>
      request.all()[item] ? true : false
    );
    let headersName = await request.input(headersNameRequest);
    let headersValue = await request.input(headersValueRequest);

    for (const index in headersName) {
      const webHookHeader = await WebHookHeader.firstOrCreate({
        name: headersName[index],
        value: headersValue[index],
        accountId,
      });

      await webHook.related("headers").sync([webHookHeader.id]);
    }

    let paramsId = await request.input(["system_entity_param_id"]);
    const systemEntityParams = await SystemEntityParam.query().whereIn(
      "id",
      paramsId
    );

    const paramsName = systemEntityParams.map((param) => param.name);

    for (let index in paramsName) {
      await webHook.related("params").create({
        name: paramsName[index],
        webHookId: webHook.id,
        systemEntityParamId: paramsId[index],
      });
    }

    return webHook;
  }
}
