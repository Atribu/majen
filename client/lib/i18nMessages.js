import "server-only";

function getMessageNode(messages, path) {
  return String(path)
    .split(".")
    .reduce((node, key) => node?.[key], messages);
}

function setMessageNode(target, path, value) {
  const keys = String(path).split(".");
  let node = target;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      node[key] = value;
      return;
    }

    node[key] ||= {};
    node = node[key];
  });
}

export function pickMessages(messages, paths) {
  return paths.reduce((picked, path) => {
    const value = getMessageNode(messages, path);
    if (value !== undefined) setMessageNode(picked, path, value);
    return picked;
  }, {});
}

export function pickProductMessages(messages, productKey) {
  const sharedPaths = [
    "ProductPage.breadcrumbs",
    "ProductPage.home",
    "ProductPage.products",
    "ProductPage.details",
    "ProductPage.detailsHeadings",
    "ProductPage.descriptions",
    "ProductPage.cuts",
  ];

  const picked = pickMessages(messages, [
    ...sharedPaths,
    "TravertinePage",
    "ContactForm",
    "SampleBoard",
    "QuestionsSection",
    "Footer.social",
  ]);

  const product = messages?.ProductPage?.[productKey];
  if (!product) return picked;

  const { cuts = {}, ...productSummary } = product;
  const cutSummaryKeys = ["image", "youtube", "title", "desc"];
  const summarizedCuts = Object.fromEntries(
    Object.entries(cuts).map(([key, value]) => {
      if (key !== "vein-cut" && key !== "cross-cut") return [key, value];

      return [
        key,
        Object.fromEntries(
          cutSummaryKeys
            .filter((summaryKey) => value?.[summaryKey] !== undefined)
            .map((summaryKey) => [summaryKey, value[summaryKey]])
        ),
      ];
    })
  );

  picked.ProductPage ||= {};
  picked.ProductPage[productKey] = {
    ...productSummary,
    cuts: summarizedCuts,
  };

  return picked;
}

export function pickProductCutMessages(messages, productKey, cutKey) {
  const picked = pickProductMessages(messages, productKey);
  const cut = messages?.ProductPage?.[productKey]?.cuts?.[cutKey];

  if (cut) picked.ProductPage[productKey].cuts[cutKey] = cut;

  return picked;
}
