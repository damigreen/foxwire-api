import SystemEntityParam from "App/Models/System/SystemEntityParam";
import WebHook from "App/Models/System/WebHook";
import SystemEvent from "App/Models/System/SystemEvent";
import StoreValidator from "App/Validators/System/WebHook/StoreValidator";
import WebHookHeader from "App/Models/System/WebHookHeader";

export default class Create {
  async handle(payload: typeof StoreValidator.parsedSchema.props, request) {
    const {
      name,
      url,
      accountId,
      systemEntityId,
      webHookVerbId,
      basicAuthUsername,
      basicAuthPassword,
      systemEventTriggerId,
    } = payload;

    const event = await SystemEvent.updateOrCreate(
      { accountId, systemEventTriggerId },
      { accountId, systemEventTriggerId }
    );

    const webHook = await WebHook.create({
      name,
      url,
      accountId,
      systemEntityId,
      webHookVerbId,
      basicAuthUsername,
      basicAuthPassword,
    });

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
