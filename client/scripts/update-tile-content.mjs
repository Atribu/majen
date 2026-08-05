import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CUTS = ["vein-cut", "cross-cut"];
const SKIP_PROCESS_KEYS = new Set(["images", "youtube", "heading", "subtext", "groups", "meta"]);
const TILE_PROCESS_KEYS = [
  "natural",
  "unfilled-natural",
  "filled-natural",
  "unfilled-honed",
  "filled-honed",
  "unfilled-polished",
  "filled-polished",
  "unfilled-brushed",
  "filled-brushed",
  "unfilled-tumbled",
  "filled-tumbled",
];
const TILE_SIZE_KEYS = [
  "8x8",
  "12x12",
  "12x24",
  "16x16",
  "18x18",
  "24x24",
  "24x48",
  "48x110",
  "versailles-set",
];

const labels = {
  tr: {
    product: "Traverten Karolar",
    cuts: { "vein-cut": "Damar Kesim", "cross-cut": "Enine Kesim" },
    fill: { filled: "Dolgulu", unfilled: "Dolgusuz" },
    finish: {
      natural: "Doğal",
      honed: "Honlanmış",
      polished: "Cilalı",
      brushed: "Fırçalanmış",
      tumbled: "Eskitilmiş",
    },
  },
  en: {
    product: "Travertine Tiles",
    cuts: { "vein-cut": "Vein Cut", "cross-cut": "Cross Cut" },
    fill: { filled: "Filled", unfilled: "Unfilled" },
    finish: {
      natural: "Natural",
      honed: "Honed",
      polished: "Polished",
      brushed: "Brushed",
      tumbled: "Tumbled",
    },
  },
};

const finishCopy = {
  tr: {
    natural: "Taşın kesimden gelen doğal dokusunu ve gözenek yapısını görünür bırakan, en az müdahaleli yüzeydir.",
    honed: "Parlak olmayan, saten-mat bir görünüm oluşturan honlama işlemi rengi yumuşak biçimde gösterir.",
    polished: "Yüksek yansıtıcılığa sahip cilalı yüzey, travertenin renk ve desen kontrastını belirginleştirir.",
    brushed: "Aşındırıcı fırçalarla elde edilen fırçalanmış yüzey, taşa hafif rölyef ve daha belirgin bir dokunuş kazandırır.",
    tumbled: "Eskitme işlemi kenarları yumuşatır ve yüzeye kullanılmış taş hissi veren düzensiz, rustik bir karakter kazandırır.",
  },
  en: {
    natural: "The least altered option, retaining the texture left by cutting and the visible pore structure of the stone.",
    honed: "Honing creates a non-reflective, satin-matte appearance that presents the stone colour with restrained depth.",
    polished: "A glossy, highly reflective polished finish intensifies the colour and pattern contrast of travertine.",
    brushed: "Abrasive brushing gives the surface light relief and a more tactile texture.",
    tumbled: "Tumbling softens the edges and creates an irregular, time-worn character suited to more rustic compositions.",
  },
};

function processParts(rawKey) {
  const normalized = rawKey === "natural" ? "unfilled-natural" : rawKey;
  const [fillRaw, finishRaw] = normalized.split("-");
  return {
    fill: fillRaw === "filled" ? "filled" : "unfilled",
    finish: finishCopy.en[finishRaw] ? finishRaw : "natural",
  };
}

function titleFor(lang, cut, fill, finish) {
  const l = labels[lang];
  return `${l.fill[fill]} ${l.finish[finish]} ${l.cuts[cut]} ${l.product}`;
}

function rootContent(lang) {
  if (lang === "tr") {
    return {
      title: "Toptan Traverten Karolar",
      intro: "Majen traverten karoları; damar kesim ve enine kesim desenleri, Blaundos Antiko, Light ve Ivory renkleri ve farklı yüzey seçenekleriyle modüler zemin ve duvar uygulamaları için hazırlanır. Katalogdaki kare, dikdörtgen, büyük format ve Versailles setleri proje yerleşimine göre birlikte planlanabilir. Her siparişte ebat dağılımı, yüzey, ton aralığı ve paketleme düzeni uygulama koşullarıyla birlikte değerlendirilir.",
      title2: "Neden Traverten Karo?",
      intro2: "Traverten karo, doğal taşın renk ve gözenek farklılıklarını tekrarlanabilir modüler ölçülerle bir araya getirir. İç zemin, duvar, banyo, otel ve ticari mekânlarda; uygun ürün ve kurulum sistemi seçildiğinde teras ve havuz çevresi gibi dış alanlarda kullanılabilir. Islak veya dış mekân uygunluğu yalnız yüzey adına göre değil; taşın teknik verileri, altlık, drenaj, su yalıtımı, yapıştırıcı ve hareket derzleri birlikte ele alınarak belirlenmelidir.",
      detailsHeadings: {
        title1: "Kontrollü Karo Üretimi",
        title2: "Kullanım Alanları",
        title3: "Modüler Ebatlar & Kalibrasyon",
        title4: "Yüzey Seçimi & Paketleme",
        sizes: "Ebatlar",
        finishes: "Yüzeyler",
        features: "Öne Çıkanlar",
      },
      description: [
        "Ebat, gönye, kalınlık kalibrasyonu, kenar doğruluğu ve yüzey tutarlılığı parti bazında kontrol edilir. Doğal ton ve gözenek farklılıkları ise uygulama öncesi harmanlama planının parçası olarak değerlendirilir.",
        "Traverten karolar iç zeminlerde, duvarlarda, banyolarda, lobilerde ve mağazalarda modüler tasarım olanağı sunar. Dış ve ıslak alanlarda ürün seçimi, teknik performans ve tüm kurulum sistemi proje özelinde doğrulanmalıdır.",
        "Katalog; 8×8, 12×12, 12×24, 16×16, 18×18, 24×24, 24×48 ve 48×110 formatları ile Versailles setini kapsar. Üretilebilir kalınlık ve toleranslar sipariş öncesinde kullanım alanına göre teyit edilir.",
        "Doğal, honlanmış, cilalı, fırçalanmış ve eskitilmiş yüzeyler farklı görsel ve dokunsal sonuçlar verir. Karolar ebat ve parti bilgileri ayrılarak, yüzey ve köşeleri koruyan ihracat kasalarında hazırlanır.",
      ],
      textSection: {
        header1: "Modüler Karo Üretimi ve Parti Planlaması",
        text1: "Sipariş planı toplam metrekarenin yanında ebat dağılımını, döşeme desenini, kesim yönünü ve gerekli yedek oranını içerir. Birlikte kullanılacak modüllerin uyumlu renk aralığından hazırlanması ve kasa etiketlerinde ebat ile miktarın ayrılması, sahadaki uygulama sırasını kolaylaştırır.",
        header2: "Ölçü, Gönye ve Ton Kontrolü",
        text2: "Kalınlık kalibrasyonu, köşe gönyesi, kenar doğruluğu ve yüzey işlemi parti bazında incelenir. Traverten doğal bir malzeme olduğu için ton ve gözenek dağılımı tek tip kabul edilmez; uygulamadan önce farklı kasalardan kuru serim veya harmanlama yapılması önerilir.",
        header3: "İç ve Dış Mekân Seçimi",
        text3: "Honlanmış yüzey düşük yansımaya sahip sakin bir görünüm, cilalı yüzey daha parlak bir ifade, fırçalanmış ve eskitilmiş yüzeyler ise daha belirgin doku sunar. Islak ve dış alanlarda kayma, donma-çözülme, drenaj ve su yalıtımı gereksinimleri proje ekibi tarafından ayrıca doğrulanmalıdır.",
        header4: "Bakım ve Uygulamaya Hazırlık",
        text4: "Traverten kalsiyum karbonat esaslı olduğundan asitli ve aşındırıcı temizleyiciler yüzeyi matlaştırabilir veya aşındırabilir. Nötr temizleyiciler tercih edilmeli; emprenye gerekiyorsa bunun taşı leke geçirmez değil, lekeye karşı daha dirençli hâle getirdiği dikkate alınmalıdır.",
      },
      faq: {
        aboutpage_s4_faq_header1: "SSS",
        aboutpage_s4_faq_span1: "Traverten Karolar",
        aboutpage_s4_faq1_header: "Hangi traverten karo ebatları sunuluyor?",
        aboutpage_s4_faq1_text: "Katalogda kare, dikdörtgen, büyük format ve Versailles set seçenekleri bulunur. Kesin ebat, kalınlık ve tolerans bilgileri seçilen yüzey ve proje koşullarına göre sipariş öncesinde teyit edilir.",
        aboutpage_s4_faq2_header: "Islak veya dış alan için hangi yüzey seçilmelidir?",
        aboutpage_s4_faq2_text: "Tek bir yüzey adı her proje için kayma ya da hava koşulu performansı garantisi vermez. Numune ve teknik veriler; altlık, drenaj, su yalıtımı, yapıştırıcı ve hareket derzi tasarımıyla birlikte değerlendirilmelidir.",
        aboutpage_s4_faq3_header: "Traverten karolar nasıl temizlenmelidir?",
        aboutpage_s4_faq3_text: "Nötr pH'lı doğal taş temizleyicileri kullanılmalı; sirke, limon veya diğer asitli ürünlerden ve aşındırıcı kremlerden kaçınılmalıdır.",
        aboutpage_s4_faq4_header: "Karolar sevkiyata nasıl hazırlanır?",
        aboutpage_s4_faq4_text: "Ebatlar ve partiler ayrı etiketlenir; yüzey ve köşeleri koruyacak ayırıcılarla güçlendirilmiş kasalara yerleştirilerek konteyner yüklemesine hazırlanır.",
      },
    };
  }

  return {
    title: "Wholesale Travertine Tiles",
    intro: "Majen travertine tiles are prepared for modular floor and wall applications in vein-cut and cross-cut patterns, Blaundos Antiko, Light and Ivory colours, and a range of surface finishes. Square, rectangular, large-format and Versailles modules can be coordinated around the project layout. Size distribution, finish, shade range and crate organization are reviewed together for each order.",
    title2: "Why Choose Travertine Tile?",
    intro2: "Travertine tile combines the colour and pore variation of natural stone with repeatable modular formats. It can be specified for interior floors, walls, bathrooms, hospitality and retail environments, and—when the product and installation system are properly selected—for exterior terraces and pool surrounds. Wet or exterior suitability must be assessed from stone test data, substrate, drainage, waterproofing, adhesive and movement-joint design rather than from the finish name alone.",
    detailsHeadings: {
      title1: "Controlled Tile Production",
      title2: "Applications",
      title3: "Modular Formats & Calibration",
      title4: "Finish Selection & Packing",
      sizes: "Sizes",
      finishes: "Finishes",
      features: "Highlights",
    },
    description: [
      "Size, squareness, thickness calibration, edge accuracy and finish consistency are checked by production lot. Natural shade and pore variation are managed through the project blending plan rather than treated as defects.",
      "Travertine tiles provide a modular natural-stone surface for interior floors, walls, bathrooms, lobbies and retail spaces. Exterior and wet-area use requires project-specific verification of performance and the complete installation system.",
      "The catalogue includes 8×8, 12×12, 12×24, 16×16, 18×18, 24×24, 24×48 and 48×110 formats, plus the Versailles set. Available thickness and tolerances are confirmed for the intended application before ordering.",
      "Natural, honed, polished, brushed and tumbled finishes create different visual and tactile results. Tiles are separated by size and lot and packed in export crates designed to protect faces and corners.",
    ],
    textSection: {
      header1: "Modular Production and Lot Planning",
      text1: "Order planning covers size distribution, laying pattern, cut orientation and spare allowance in addition to total area. Producing modules that will be installed together within a compatible shade range and separating size and quantity on crate labels simplifies site sequencing.",
      header2: "Dimension, Squareness and Shade Control",
      text2: "Thickness calibration, corner squareness, edge accuracy and finish are reviewed by lot. Because travertine is natural, shade and pore distribution should not be treated as uniform; dry laying or blending from several crates is recommended before installation.",
      header3: "Interior and Exterior Selection",
      text3: "Honed finishes create a restrained low-reflective surface, polished finishes a glossier expression, and brushed or tumbled finishes a more tactile texture. Slip, freeze-thaw, drainage and waterproofing requirements for wet or exterior locations must be verified by the project team.",
      header4: "Care and Installation Preparation",
      text4: "Travertine is calcium-carbonate based, so acidic or abrasive cleaners can etch or dull the surface. Neutral stone cleaners should be used. Where an impregnator is specified, it should be understood as improving stain resistance rather than making the stone stain-proof.",
    },
    faq: {
      aboutpage_s4_faq_header1: "FAQ",
      aboutpage_s4_faq_span1: "Travertine Tiles",
      aboutpage_s4_faq1_header: "Which travertine tile sizes are available?",
      aboutpage_s4_faq1_text: "The catalogue includes square, rectangular, large-format and Versailles modules. Exact size, thickness and tolerance are confirmed against the selected finish and project conditions before ordering.",
      aboutpage_s4_faq2_header: "Which finish should be used in wet or exterior areas?",
      aboutpage_s4_faq2_text: "No finish name alone guarantees slip or weather performance for every project. Samples and technical data should be assessed with the substrate, drainage, waterproofing, adhesive and movement-joint design.",
      aboutpage_s4_faq3_header: "How should travertine tiles be cleaned?",
      aboutpage_s4_faq3_text: "Use a pH-neutral natural-stone cleaner and avoid vinegar, lemon, other acidic products and abrasive creams.",
      aboutpage_s4_faq4_header: "How are tiles prepared for shipment?",
      aboutpage_s4_faq4_text: "Sizes and lots are labelled separately and placed in reinforced crates with separators that protect faces and corners during container transport.",
    },
  };
}

function cutContent(lang, cut) {
  const l = labels[lang];
  const vein = cut === "vein-cut";
  if (lang === "tr") {
    return {
      seoTitle: `${l.cuts[cut]} Traverten Karolar | Majen`,
      seoDescription: `${l.cuts[cut]} traverten karoların desen yönü, yüzey seçenekleri, modüler ebatları, uygulama ve bakım bilgileri.`,
      title: `${l.cuts[cut]} Traverten Karolar`,
      span: l.cuts[cut],
      intro: vein
        ? "Damar kesim traverten karolar, taşın tabakalanma yönüne paralel kesilmesiyle doğrusal bantları ve yönlü hareketi görünür kılar. Modüler karolar aynı yönü izleyerek döşendiğinde kesintisiz bir akış; dönüşümlü yerleştirildiğinde daha grafik bir kompozisyon oluşturabilir."
        : "Enine kesim traverten karolar, taşın tabakalanma yönünü kesen üretimle daha dağınık, bulutsu ve dairesel desenler gösterir. Modüler ebatlar doğal ton geçişlerini geniş yüzeye dengeli biçimde yayar ve yön bağımlılığı daha düşük bir döşeme dili sunar.",
      title2: `${l.cuts[cut]} Karo Deseni Nasıl Oluşur?`,
      intro2: vein
        ? "Kesim düzlemi tabakalara paralel ilerlediği için mineral katmanları çizgisel görünür. Karoların damar yönü, döşeme planında önceden belirlenmeli ve kasa yerleşimi buna göre hazırlanmalıdır."
        : "Kesim düzlemi tabakaları enine geçtiği için damarlar çizgi yerine yumuşak adalar ve bulutlar hâlinde görünür. Kuru serim ve farklı kasalardan harmanlama, doğal desen dağılımını dengelemeye yardımcı olur.",
      desc: vein ? "Doğrusal damar yönüne sahip modüler traverten karolar." : "Bulutsu desen dağılımına sahip modüler traverten karolar.",
      textSection: {
        header1: "Desen Yönü ve Döşeme Planı",
        text1: vein
          ? "Damar yönü koridorlarda uzunluk etkisini güçlendirebilir; geniş alanlarda aynı yönde, şaşırtmalı veya seçili bölgelerde dönüşümlü kullanılabilir. Uygulama öncesi kuru serim, çizgilerin birleşimini ve doğal ton geçişlerini görmeyi kolaylaştırır."
          : "Enine kesimde desen tek bir yöne bağlı değildir. Kare ve dikdörtgen modüller düz, şaşırtmalı veya Versailles düzeninde kullanılabilir; farklı kasalardan harmanlama bulutsu hareketi dengeler.",
        header2: "Yüzey ve Dolgu Seçimi",
        text2: "Dolgulu yüzeyler gözenekleri daha kapalı ve temizliği daha kolay bir yüzey oluştururken, dolgusuz seçenekler doğal boşlukları görünür bırakır. Honlanmış, cilalı, fırçalanmış, eskitilmiş ve doğal yüzeyler farklı ışık ve dokunma etkileri verir.",
        header3: "Uygulama Koşulları",
        text3: "Karonun uygunluğu yalnız desene göre belirlenmez. Taşın teknik değerleri ve yüzeyi; kullanım yoğunluğu, altlık düzgünlüğü, yapıştırıcı, derz, su yalıtımı, drenaj ve hareket derzleriyle birlikte değerlendirilmelidir.",
        header4: "Bakım",
        text4: "Kalsiyum karbonat esaslı traverten için nötr temizleyici kullanılmalı, asitli ve aşındırıcı ürünlerden kaçınılmalıdır. Emprenye gereksinimi seçilen yüzeye ve kullanım alanına göre ürün üreticisiyle birlikte belirlenmelidir.",
      },
    };
  }
  return {
    seoTitle: `${l.cuts[cut]} Travertine Tiles | Majen`,
    seoDescription: `Pattern direction, finishes, modular sizes, application and care information for ${l.cuts[cut].toLowerCase()} travertine tiles.`,
    title: `${l.cuts[cut]} Travertine Tiles`,
    span: l.cuts[cut],
    intro: vein
      ? "Vein-cut travertine tiles are sawn parallel to the bedding, revealing linear bands and directional movement. Installed in one direction, modular tiles can create continuous flow; rotated selectively, they can form a more graphic composition."
      : "Cross-cut travertine tiles are sawn across the bedding, revealing dispersed cloud-like and circular patterning. Modular formats distribute natural tonal movement across the surface and create a layout that is less dependent on a single direction.",
    title2: `How Is the ${l.cuts[cut]} Tile Pattern Created?`,
    intro2: vein
      ? "Because the cutting plane follows the bedding, mineral layers appear as lines. Vein direction should be established in the laying plan and coordinated with crate sequencing."
      : "Because the cutting plane crosses the bedding, veins appear as soft islands and clouds rather than lines. Dry laying and blending from several crates help balance the natural pattern distribution.",
    desc: vein ? "Modular travertine tiles with a linear vein direction." : "Modular travertine tiles with a cloud-like pattern distribution.",
    textSection: {
      header1: "Pattern Direction and Layout",
      text1: vein
        ? "Vein direction can reinforce length in corridors and may be laid consistently, staggered or selectively rotated in larger areas. Dry laying before installation makes line continuity and natural shade transitions easier to review."
        : "Cross-cut patterning is not tied to one dominant direction. Square and rectangular modules can be used in straight, staggered or Versailles layouts; blending from several crates balances the cloudy movement.",
      header2: "Finish and Filling Selection",
      text2: "Filled tiles create a more closed surface that is easier to clean, while unfilled options retain visible natural voids. Honed, polished, brushed, tumbled and natural finishes produce different responses to light and touch.",
      header3: "Installation Conditions",
      text3: "Suitability is not determined by pattern alone. Stone test data and finish must be assessed with traffic, substrate flatness, adhesive, grout, waterproofing, drainage and movement-joint design.",
      header4: "Care",
      text4: "Use a neutral cleaner for calcium-carbonate based travertine and avoid acidic or abrasive products. Any impregnator should be selected with the finish, location and product-manufacturer guidance in mind.",
    },
  };
}

function processContent(lang, cut, rawKey) {
  const { fill, finish } = processParts(rawKey);
  const l = labels[lang];
  const title = titleFor(lang, cut, fill, finish);
  const isFilled = fill === "filled";
  const finishText = finishCopy[lang][finish];
  const pattern = cut === "vein-cut"
    ? (lang === "tr" ? "doğrusal damar akışı" : "linear vein movement")
    : (lang === "tr" ? "bulutsu desen dağılımı" : "cloud-like pattern distribution");

  if (lang === "tr") {
    const fillText = isFilled
      ? "Üretim sırasında uygun dolgu malzemesiyle kapatılan gözenekler daha bütüncül, temizliği kolay bir yüzey oluşturur. Dolgu rengi, taş tonu ve kullanım koşulları sipariş öncesinde birlikte değerlendirilmelidir."
      : "Doğal gözenekler görünür bırakılarak travertenin özgün boşluklu karakteri korunur. Uygulama sırasında boşlukların açık bırakılması veya derzle doldurulması, kullanım alanı ve bakım beklentisine göre belirlenmelidir.";
    return {
      title,
      lead: `${pattern.charAt(0).toUpperCase() + pattern.slice(1)}, ${isFilled ? "dolgulu" : "dolgusuz"} yapı ve ${l.finish[finish].toLowerCase()} yüzeyin birlikte oluşturduğu modüler karo seçeneği.`,
      intro: `${title}, ${pattern} ile ${isFilled ? "daha kapalı gözenek yapısını" : "görünür doğal gözenekleri"} bir araya getirir. ${finishText} Ebat, ton aralığı ve yüzey uygunluğu proje koşullarına göre birlikte seçilir.`,
      title2: `${title} Nedir?`,
      intro2: `${fillText} ${finishText} Islak, dış veya yoğun kullanımlı alanlarda numune ve teknik performans verileri tüm kurulum sistemiyle birlikte doğrulanmalıdır.`,
      detailsHeadings: {
        title1: `${l.finish[finish]} Yüzey Karakteri`,
        title2: isFilled ? "Kontrollü Dolgu" : "Doğal Gözenek Yapısı",
        title3: `${l.cuts[cut]} Desen`,
        title4: "Proje Bazlı Seçim",
        sizes: "Ebatlar",
        finishes: "Yüzeyler",
        features: "Öne Çıkanlar",
      },
      description: [
        finishText,
        fillText,
        `${l.cuts[cut]} üretim ${pattern} oluşturur. Karo yönü ve desen dağılımı uygulama öncesi kuru serimle kontrol edilebilir.`,
        "Kalınlık, yüzey, dolgu, kullanım yoğunluğu ve kurulum yöntemi proje gereksinimlerine göre birlikte belirlenmelidir; tek bir yüzey adı tüm alanlar için performans garantisi değildir.",
      ],
      textSection: {
        header1: "Tasarım ve Kullanım Alanları",
        text1: `${title}; iç zemin, duvar, banyo, lobi ve ticari mekânlarda modüler doğal taş yüzeyi oluşturur. Dış ve ıslak alanlarda kullanım, taşın teknik verileri ve eksiksiz kurulum sistemi doğrulandıktan sonra belirlenmelidir.`,
        header2: "Yüzey ve Gözenek Yapısı",
        text2: `${finishText} ${fillText}`,
        header3: "Ebat ve Desen Planlaması",
        text3: "Kare, dikdörtgen, büyük format ve Versailles modülleri seçilen desen yönüyle birlikte planlanır. Uygulama öncesi farklı kasalardan harmanlama, doğal renk ve gözenek hareketini dengeler.",
        header4: "Bakım ve Koruma",
        text4: "Günlük bakımda nötr pH'lı doğal taş temizleyicisi kullanılmalıdır. Asitli ürünler traverteni aşındırabilir; emprenye ise taşı leke geçirmez yapmaz, uygun üründe lekeye karşı direnci artırabilir.",
        header5: "Sipariş ve Kalite Kontrolü",
        text5: "Ebat, gönye, kalibrasyon, yüzey, dolgu ve ton aralığı üretim partisi bazında kontrol edilir. Kasa etiketleri ebat ve parti bilgisini ayırarak stok ve saha dağıtımını kolaylaştırır.",
      },
      faq: {
        aboutpage_s4_faq_header1: "SSS",
        aboutpage_s4_faq_span1: title,
        aboutpage_s4_faq1_header: `${l.finish[finish]} yüzey nasıl görünür?`,
        aboutpage_s4_faq1_text: finishText,
        aboutpage_s4_faq2_header: isFilled ? "Dolgu ne sağlar?" : "Gözenekler uygulamada açık mı bırakılır?",
        aboutpage_s4_faq2_text: fillText,
        aboutpage_s4_faq3_header: "Islak veya dış mekânda kullanılabilir mi?",
        aboutpage_s4_faq3_text: "Uygunluk numune ve teknik veriler üzerinden; altlık, su yalıtımı, drenaj, yapıştırıcı, derz ve hareket derzleriyle birlikte proje özelinde değerlendirilmelidir.",
        aboutpage_s4_faq4_header: "Hangi ebatlar sunuluyor?",
        aboutpage_s4_faq4_text: "Katalogdaki modüler ebatlar ve Versailles seti sunulur. Kesin kalınlık ve toleranslar sipariş öncesinde kullanım alanına göre teyit edilir.",
        aboutpage_s4_faq5_header: "Nasıl temizlenmelidir?",
        aboutpage_s4_faq5_text: "Nötr pH'lı doğal taş temizleyicisi kullanın; sirke, limon ve diğer asitli veya aşındırıcı ürünlerden kaçının.",
        aboutpage_s4_faq6_header: "Doğal renk farklılıkları nasıl yönetilir?",
        aboutpage_s4_faq6_text: "Uygulamadan önce birkaç kasadan kuru serim ve harmanlama yapılarak ton ve desen geçişleri yüzeye dengeli dağıtılır.",
      },
      variants: {
        title: "Ebat ve Renk Seçenekleri",
        text: "Bu işlem katalogdaki modüler ebatlarda ve Blaundos Ivory, Light ve Antiko renklerinde planlanabilir. Kullanılabilir kombinasyonlar, ton aralığı ve üretim toleransları sipariş öncesinde teyit edilir.",
      },
      seo: {
        title: `${title} | Majen`,
        description: `${title} için desen, dolgu, yüzey, ebat, uygulama ve bakım bilgileri.`,
      },
    };
  }

  const fillText = isFilled
    ? "Pores closed with a compatible filling material during production create a more continuous surface that is easier to clean. Fill colour, stone shade and service conditions should be reviewed together before ordering."
    : "Visible natural pores retain the characteristic voided structure of travertine. Whether voids remain open or are grouted during installation should be decided from the location and maintenance expectations.";
  return {
    title,
    lead: `${pattern.charAt(0).toUpperCase() + pattern.slice(1)}, an ${isFilled ? "filled" : "unfilled"} pore structure and a ${l.finish[finish].toLowerCase()} finish in a modular tile format.`,
    intro: `${title} combines ${pattern} with ${isFilled ? "a more closed pore structure" : "visible natural pores"}. ${finishText} Format, shade range and finish suitability are selected together for the project conditions.`,
    title2: `What Are ${title}?`,
    intro2: `${fillText} ${finishText} Samples and technical performance data must be reviewed with the complete installation system for wet, exterior or heavy-use locations.`,
    detailsHeadings: {
      title1: `${l.finish[finish]} Surface Character`,
      title2: isFilled ? "Controlled Filling" : "Natural Pore Structure",
      title3: `${l.cuts[cut]} Pattern`,
      title4: "Project-Based Selection",
      sizes: "Sizes",
      finishes: "Finishes",
      features: "Highlights",
    },
    description: [
      finishText,
      fillText,
      `${l.cuts[cut]} production creates ${pattern}. Tile direction and pattern distribution can be reviewed through dry laying before installation.`,
      "Thickness, finish, filling, traffic and installation method should be selected together for the project; a finish name alone is not a performance guarantee for every location.",
    ],
    textSection: {
      header1: "Design and Applications",
      text1: `${title} provide a modular natural-stone surface for interior floors, walls, bathrooms, lobbies and commercial spaces. Exterior and wet-area use should follow verification of stone test data and the complete installation system.`,
      header2: "Finish and Pore Structure",
      text2: `${finishText} ${fillText}`,
      header3: "Format and Pattern Planning",
      text3: "Square, rectangular, large-format and Versailles modules are planned with the selected pattern direction. Blending from several crates before installation balances natural shade and pore movement.",
      header4: "Care and Protection",
      text4: "Use a pH-neutral natural-stone cleaner for routine care. Acids can etch travertine; an impregnator does not make stone stain-proof but may improve stain resistance when correctly selected.",
      header5: "Order and Quality Control",
      text5: "Size, squareness, calibration, finish, filling and shade range are reviewed by production lot. Crate labels separate size and lot information to simplify stock and site distribution.",
    },
    faq: {
      aboutpage_s4_faq_header1: "FAQ",
      aboutpage_s4_faq_span1: title,
      aboutpage_s4_faq1_header: `What does a ${l.finish[finish].toLowerCase()} finish look like?`,
      aboutpage_s4_faq1_text: finishText,
      aboutpage_s4_faq2_header: isFilled ? "What does filling achieve?" : "Are the pores left open after installation?",
      aboutpage_s4_faq2_text: fillText,
      aboutpage_s4_faq3_header: "Can it be used in wet or exterior areas?",
      aboutpage_s4_faq3_text: "Suitability must be assessed from samples and technical data together with substrate, waterproofing, drainage, adhesive, grout and movement-joint design.",
      aboutpage_s4_faq4_header: "Which sizes are available?",
      aboutpage_s4_faq4_text: "Catalogue modules and the Versailles set are offered. Exact thickness and tolerances are confirmed against the intended use before ordering.",
      aboutpage_s4_faq5_header: "How should it be cleaned?",
      aboutpage_s4_faq5_text: "Use a pH-neutral natural-stone cleaner and avoid vinegar, lemon and other acidic or abrasive products.",
      aboutpage_s4_faq6_header: "How should natural shade variation be managed?",
      aboutpage_s4_faq6_text: "Dry lay and blend tiles from several crates before installation to distribute shade and pattern transitions across the surface.",
    },
    variants: {
      title: "Size and Colour Options",
      text: "This process can be planned in catalogue modules and Blaundos Ivory, Light and Antiko colours. Available combinations, shade range and production tolerances are confirmed before ordering.",
    },
    seo: {
      title: `${title} | Majen`,
      description: `Pattern, filling, finish, size, application and care information for ${title.toLowerCase()}.`,
    },
  };
}

function updateSizeNodes(lang, cut, rawKey, processNode) {
  if (!processNode?.sizes || typeof processNode.sizes !== "object") return;
  const { fill, finish } = processParts(rawKey);
  const processTitle = titleFor(lang, cut, fill, finish);
  for (const [sizeKey, sizeNode] of Object.entries(processNode.sizes)) {
    if (!sizeNode || typeof sizeNode !== "object") continue;
    const displaySize = sizeKey
      .replace("versailles-set", "Versailles Set")
      .replace("versailles_set", "Versailles Set")
      .replace(/x/g, "×");
    if (lang === "tr") {
      Object.assign(sizeNode, {
        metaTitle: `${displaySize} ${processTitle} | Majen`,
        metaDesc: `${displaySize} ${processTitle} için desen, uygulama, bakım ve teknik seçim bilgileri.`,
        h1: `${displaySize} ${processTitle}`,
        title: `${displaySize} ${processTitle}`,
        lead: `${displaySize} modül, ${labels.tr.cuts[cut].toLowerCase()} desen ile ${labels.tr.finish[finish].toLowerCase()} yüzeyi bir araya getirir.`,
        intro: `${displaySize} ${processTitle}, modüler zemin ve duvar düzenleri için hazırlanır. Doğal ton ve gözenek farklılıkları uygulama öncesi kuru serim ve harmanlama ile dengelenmelidir.`,
        intro2: `Kesin kalınlık, tolerans, dolgu ve yüzey uygunluğu; kullanım alanı ve kurulum sistemi dikkate alınarak sipariş öncesinde teyit edilir.`,
        desc: `${displaySize} ${processTitle} hakkında teknik ve uygulama özeti.`,
        h3: "Uygulama ve Döşeme Planı",
        text3: `${displaySize} formatın derz düzeni, desen yönü ve kesim kaybı proje çizimi üzerinden planlanmalıdır. Uygulama yüzeyi düz, sağlam ve seçilen doğal taş sistemine uygun hazırlanmalıdır.`,
        h4: "Bakım ve Teknik Seçim",
        text4: "Nötr pH'lı doğal taş temizleyicisi kullanın. Islak veya dış mekân için taş performansı, yüzey, altlık, su yalıtımı, drenaj, yapıştırıcı ve hareket derzlerini birlikte değerlendirin.",
        h5: "Renk ve Parti Harmanlama",
        text5: "Travertenin doğal ton, damar ve gözenek farklılıklarını dengeli dağıtmak için uygulamadan önce birkaç kasadan karo harmanlayın.",
        ui: {
          chooseThickness: "Kalınlık Seçin",
          applicationsLabel: "Uygulamalar",
          specsLabel: "Teknik Özellikler",
          faqLabel: "SSS",
        },
        sections: {
          applications: {
            h2: "Uygulamalar",
            p: "İç zeminler, duvarlar ve proje koşulları doğrulandığında seçili dış veya ıslak alan uygulamaları.",
          },
          specs: {
            h2: "Teknik Özellikler",
            rows: [
              { prop: "Format", value: displaySize },
              { prop: "Kesim", value: labels.tr.cuts[cut] },
              { prop: "Gözenek", value: labels.tr.fill[fill] },
              { prop: "Yüzey", value: labels.tr.finish[finish] },
              { prop: "Kalınlık", value: "Proje ve kurulum sistemine göre teyit edilir" },
            ],
          },
          faq: {
            h2: "SSS",
            items: [
              {
                q: "Islak veya dış mekâna uygun mu?",
                a: "Uygunluk taşın teknik verileri, yüzey, altlık, su yalıtımı, drenaj ve tüm kurulum sistemiyle birlikte doğrulanmalıdır.",
              },
            ],
          },
        },
        finishes: {
          title: "Üretim ve Kontrol",
          list1: `Yüzey: ${labels.tr.finish[finish]} işlemin görsel ve dokunsal sonucu numune üzerinden değerlendirilir.`,
          list2: "Ebat kontrolü: Kalınlık kalibrasyonu, gönye ve kenar doğruluğu parti bazında incelenir.",
          list3: "Ton planı: Doğal renk ve gözenek hareketi kuru serim ve kasa harmanlamasıyla dengelenir.",
          list4: "Uygulama: Altlık, yapıştırıcı, derz ve hareket derzleri proje sistemine göre seçilir.",
        },
        export: {
          title: "Paketleme ve Sevkiyat",
          list1: "Koruma: Karo yüzleri ve köşeleri uygun ayırıcılarla korunur.",
          list2: "Etiketleme: Ebat, renk partisi ve kasa miktarı ayrı gösterilir.",
          list3: "Kasalar: Konteyner taşımacılığına uygun güçlendirilmiş kasalar kullanılır.",
          list4: "Kontrol: Sevkiyat öncesinde kasa ve ürün bilgileri sipariş listesiyle eşleştirilir.",
        },
        QuestionsItems: {
          aboutpage_s4_faq_header1: "SSS",
          aboutpage_s4_faq_span1: `${displaySize} Traverten Karo`,
          aboutpage_s4_faq1_header: "Bu ebat hangi desenlerle sunulur?",
          aboutpage_s4_faq1_text: `${displaySize} format ${labels.tr.cuts[cut].toLowerCase()} desen seçeneğiyle hazırlanır; mevcut kombinasyon sipariş öncesinde teyit edilir.`,
          aboutpage_s4_faq2_header: "Kalınlık bilgisi nedir?",
          aboutpage_s4_faq2_text: "Kalınlık ve tolerans, kullanım alanı ile kurulum sistemine göre teklif aşamasında teyit edilir.",
          aboutpage_s4_faq3_header: "Bakımda nelere dikkat edilmelidir?",
          aboutpage_s4_faq3_text: "Nötr pH'lı doğal taş temizleyicisi kullanın; asitli ve aşındırıcı ürünlerden kaçının.",
          aboutpage_s4_faq4_header: "Doğal ton farkları nasıl yönetilir?",
          aboutpage_s4_faq4_text: "Uygulamadan önce birkaç kasadan kuru serim ve harmanlama yapın.",
        },
      });
    } else {
      Object.assign(sizeNode, {
        metaTitle: `${displaySize} ${processTitle} | Majen`,
        metaDesc: `Pattern, application, care and technical-selection information for ${displaySize} ${processTitle}.`,
        h1: `${displaySize} ${processTitle}`,
        title: `${displaySize} ${processTitle}`,
        lead: `The ${displaySize} module combines a ${labels.en.cuts[cut].toLowerCase()} pattern with a ${labels.en.finish[finish].toLowerCase()} finish.`,
        intro: `${displaySize} ${processTitle} are prepared for modular floor and wall layouts. Natural shade and pore variation should be balanced through dry laying and blending before installation.`,
        intro2: "Exact thickness, tolerance, filling and finish suitability are confirmed before ordering against the location and installation system.",
        desc: `Technical and application summary for ${displaySize} ${processTitle}.`,
        h3: "Application and Layout Planning",
        text3: `Joint layout, pattern direction and cutting allowance for the ${displaySize} format should be planned from project drawings. The substrate must be flat, sound and prepared for the selected natural-stone system.`,
        h4: "Care and Technical Selection",
        text4: "Use a pH-neutral natural-stone cleaner. For wet or exterior areas, assess stone performance, finish, substrate, waterproofing, drainage, adhesive and movement joints together.",
        h5: "Shade and Lot Blending",
        text5: "Blend tiles from several crates before installation to distribute the natural shade, vein and pore variation of travertine evenly.",
        ui: {
          chooseThickness: "Choose Thickness",
          applicationsLabel: "Applications",
          specsLabel: "Specifications",
          faqLabel: "FAQ",
        },
        sections: {
          applications: {
            h2: "Applications",
            p: "Interior floors, walls and selected exterior or wet-area installations when project conditions are verified.",
          },
          specs: {
            h2: "Specifications",
            rows: [
              { prop: "Format", value: displaySize },
              { prop: "Cut", value: labels.en.cuts[cut] },
              { prop: "Pore structure", value: labels.en.fill[fill] },
              { prop: "Finish", value: labels.en.finish[finish] },
              { prop: "Thickness", value: "Confirmed for the project and installation system" },
            ],
          },
          faq: {
            h2: "FAQ",
            items: [
              {
                q: "Is it suitable for wet or exterior use?",
                a: "Suitability must be verified from stone test data, finish, substrate, waterproofing, drainage and the complete installation system.",
              },
            ],
          },
        },
        finishes: {
          title: "Production and Control",
          list1: `Finish: Review the visual and tactile result of the ${labels.en.finish[finish].toLowerCase()} finish on a representative sample.`,
          list2: "Dimensional control: Thickness calibration, squareness and edge accuracy are reviewed by lot.",
          list3: "Shade planning: Natural colour and pore movement are balanced through dry laying and crate blending.",
          list4: "Installation: Substrate, adhesive, grout and movement joints are selected for the project system.",
        },
        export: {
          title: "Packing and Shipment",
          list1: "Protection: Tile faces and corners are protected with suitable separators.",
          list2: "Labelling: Size, shade lot and crate quantity are shown separately.",
          list3: "Crates: Reinforced crates suitable for container transport are used.",
          list4: "Control: Crate and product information is checked against the order list before shipment.",
        },
        QuestionsItems: {
          aboutpage_s4_faq_header1: "FAQ",
          aboutpage_s4_faq_span1: `${displaySize} Travertine Tile`,
          aboutpage_s4_faq1_header: "Which pattern is available in this format?",
          aboutpage_s4_faq1_text: `${displaySize} is prepared in a ${labels.en.cuts[cut].toLowerCase()} pattern; the available combination is confirmed before ordering.`,
          aboutpage_s4_faq2_header: "What is the tile thickness?",
          aboutpage_s4_faq2_text: "Thickness and tolerances are confirmed at quotation stage for the intended location and installation system.",
          aboutpage_s4_faq3_header: "How should it be maintained?",
          aboutpage_s4_faq3_text: "Use a pH-neutral natural-stone cleaner and avoid acidic or abrasive products.",
          aboutpage_s4_faq4_header: "How should natural shade variation be managed?",
          aboutpage_s4_faq4_text: "Dry lay and blend tiles from several crates before installation.",
        },
      });
    }
  }
}

function updateLegacyColorNodes(lang, cut, rawKey, processNode) {
  if (!processNode?.colors || typeof processNode.colors !== "object") return;
  const { fill, finish } = processParts(rawKey);
  const colourLabels = lang === "tr"
    ? { ivory: "Ivory", light: "Light", antico: "Antiko" }
    : { ivory: "Ivory", light: "Light", antico: "Antiko" };
  for (const [colour, node] of Object.entries(processNode.colors)) {
    if (!node || typeof node !== "object") continue;
    const colourLabel = colourLabels[colour] || colour;
    const processTitle = titleFor(lang, cut, fill, finish);
    if (lang === "tr") {
      Object.assign(node, {
        metaTitle: `${colourLabel} ${processTitle} | Majen`,
        metaDesc: `${colourLabel} ${processTitle} için renk, yüzey, uygulama ve bakım özeti.`,
        h1: `${colourLabel} ${processTitle}`,
        title: `${colourLabel} ${processTitle}`,
        lead: `${colourLabel} renk ailesi, ${labels.tr.cuts[cut].toLowerCase()} desen ve ${labels.tr.finish[finish].toLowerCase()} yüzeyle sunulur.`,
        intro: "Doğal taş olduğu için her üretim partisinde ton, damar ve gözenek dağılımı değişebilir. Temsilî numune ve parti aralığı sipariş öncesinde değerlendirilmelidir.",
        ui: {
          chooseThickness: "Kalınlık Seçin",
          applicationsLabel: "Uygulamalar",
          specsLabel: "Teknik Özellikler",
          faqLabel: "SSS",
        },
        sections: {
          applications: {
            h2: "Uygulamalar",
            p: "İç zemin ve duvarlar; teknik koşullar doğrulandığında seçili dış veya ıslak alanlar.",
          },
          specs: {
            h2: "Teknik Özellikler",
            rows: [
              { prop: "Renk", value: colourLabel },
              { prop: "Kesim", value: labels.tr.cuts[cut] },
              { prop: "Gözenek", value: labels.tr.fill[fill] },
              { prop: "Yüzey", value: labels.tr.finish[finish] },
            ],
          },
          faq: {
            h2: "SSS",
            items: [{ q: "Tonlar aynı mıdır?", a: "Hayır. Doğal travertende parti içinde ve partiler arasında ton ile gözenek farklılıkları beklenir." }],
          },
        },
      });
    } else {
      Object.assign(node, {
        metaTitle: `${colourLabel} ${processTitle} | Majen`,
        metaDesc: `Colour, finish, application and care summary for ${colourLabel} ${processTitle}.`,
        h1: `${colourLabel} ${processTitle}`,
        title: `${colourLabel} ${processTitle}`,
        lead: `The ${colourLabel} colour family is offered with a ${labels.en.cuts[cut].toLowerCase()} pattern and ${labels.en.finish[finish].toLowerCase()} finish.`,
        intro: "As a natural stone, shade, vein and pore distribution can vary within and between production lots. A representative sample and lot range should be reviewed before ordering.",
        ui: {
          chooseThickness: "Choose Thickness",
          applicationsLabel: "Applications",
          specsLabel: "Specifications",
          faqLabel: "FAQ",
        },
        sections: {
          applications: {
            h2: "Applications",
            p: "Interior floors and walls, plus selected exterior or wet areas when technical conditions are verified.",
          },
          specs: {
            h2: "Specifications",
            rows: [
              { prop: "Colour", value: colourLabel },
              { prop: "Cut", value: labels.en.cuts[cut] },
              { prop: "Pore structure", value: labels.en.fill[fill] },
              { prop: "Finish", value: labels.en.finish[finish] },
            ],
          },
          faq: {
            h2: "FAQ",
            items: [{ q: "Are all shades identical?", a: "No. Natural travertine is expected to vary in shade and pore distribution within and between lots." }],
          },
        },
      });
    }
  }
}

function applyRoot(tiles, content) {
  tiles.title = content.title;
  tiles.intro = content.intro;
  tiles.title2 = content.title2;
  tiles.intro2 = content.intro2;
  tiles.detailsHeadings = content.detailsHeadings;
  tiles.description = content.description;
  Object.assign(tiles.TextSection ||= {}, content.textSection);
  tiles.QuestionsItems = content.faq;
}

function updateLegacyTileVariants(tiles, lang) {
  const colourNames = lang === "tr"
    ? { antiko: "Blaundos Antiko", light: "Blaundos Light", ivory: "Blaundos Ivory" }
    : { antiko: "Blaundos Antiko", light: "Blaundos Light", ivory: "Blaundos Ivory" };
  const colourTone = lang === "tr"
    ? {
        antiko: "gri-bej ve antik ton geçişleri",
        light: "açık bej ve sıcak nötr tonlar",
        ivory: "fildişi-krem ve yumuşak açık tonlar",
      }
    : {
        antiko: "grey-beige and antique tonal movement",
        light: "light beige and warm neutral tones",
        ivory: "ivory-cream and soft pale tones",
      };

  for (const key of ["antiko", "light", "ivory"]) {
    const node = tiles[key];
    if (!node || typeof node !== "object") continue;
    const colour = colourNames[key];
    const tone = colourTone[key];
    if (lang === "tr") {
      Object.assign(node, {
        seo: {
          ...node.seo,
          title: `${colour} Traverten Karolar | Majen`,
          description: `${colour} traverten karoların renk karakteri, ebat, yüzey, uygulama ve bakım bilgileri.`,
        },
        title: `${colour} Traverten Karolar`,
        varianttitle: `${colour} Traverten Karolar`,
        alt: `${colour} traverten karo`,
        intro: `${colour} traverten karolar ${tone} ile doğal taşın parça bazındaki damar ve gözenek farklılıklarını modüler yüzeylere taşır. Gerçek üretim partisi numuneden farklılık gösterebileceği için ton aralığı sipariş öncesinde değerlendirilmelidir.`,
        title2: `${colour} Karoların Tasarım Karakteri`,
        intro2: "Damar kesim karolarda çizgisel, enine kesim karolarda daha bulutsu desenler görülür. Dolgulu veya dolgusuz yapı ile doğal, honlanmış, cilalı, fırçalanmış ve eskitilmiş yüzey seçenekleri farklı ışık ve dokunma etkileri oluşturur.",
        description: [
          "Ebat, gönye, kalibrasyon, yüzey ve ton aralığı üretim partisi bazında kontrol edilir.",
          "İç zemin, duvar, banyo, lobi ve ticari mekânlarda modüler doğal taş yüzeyi oluşturur.",
          "Katalogdaki kare, dikdörtgen, büyük format ve Versailles modülleri döşeme planına göre seçilebilir.",
          "Islak veya dış mekân kullanımı teknik veriler ve tüm kurulum sistemi üzerinden doğrulanmalıdır.",
        ],
        sizes: ["8×8", "12×12", "12×24", "16×16", "18×18", "24×24", "24×48", "48×110", "Versailles Set"],
        finishes: ["Doğal", "Honlanmış", "Cilalı", "Fırçalanmış", "Eskitilmiş"],
        cards: {
          title1: "Renk ve Desen Planı",
          text1: `${colour} karolar ${tone} sunar. Damar yönü, modül dağılımı ve derz planı uygulama öncesinde kuru serimle değerlendirilmelidir.`,
          title2: "Teknik Seçim",
          text2: "Kalınlık, yüzey ve dolgu; kullanım yoğunluğu, altlık, su yalıtımı, drenaj, yapıştırıcı ve hareket derzleriyle birlikte seçilmelidir.",
        },
        ApplicationSection: {
          title: `${colour} Traverten Karo Kullanım Alanları`,
          text: "İç zeminler, duvarlar, banyolar, lobiler ve ticari mekânlar için modüler doğal taş yüzeyi sunar.",
          subtitle: "Islak ve dış mekânlar",
          subtext: "Bu alanlarda uygunluk yalnız renge veya yüzeye göre değil, teknik performans ve kurulum sisteminin bütünüyle belirlenir.",
        },
        AvailableSection: {
          title: "Ebat ve Kesim Seçenekleri",
          text: "Kare, dikdörtgen, büyük format ve Versailles modülleri damar kesim veya enine kesim desenlerle planlanabilir.",
          subtitle: "Sipariş teyidi",
          subtext: "Üretilebilir kombinasyon, kalınlık, tolerans ve ton aralığı sipariş öncesinde teyit edilir.",
        },
        FinishesSection: {
          title: "Yüzey Seçenekleri",
          text: "Honlanmış yüzey mat-saten, cilalı yüzey parlak ve yansıtıcı, fırçalanmış ve eskitilmiş yüzeyler ise daha dokulu bir görünüm sunar.",
          subtitle: "Dolgu seçimi",
          subtext: "Dolgulu yapı daha kapalı ve temizliği kolay bir yüzey; dolgusuz yapı ise görünür doğal gözenekler oluşturur.",
          subtitle2: "Numune değerlendirmesi",
          subtext2: "Renk, yüzey ve dolgu kombinasyonu temsilî numune üzerinden değerlendirilmelidir.",
        },
        PartnerSection: {
          title: "Proje ve Tedarik Planlaması",
          description: "Siparişler ebat dağılımı, parti aralığı, yüzey ve kasa planı birlikte ele alınarak hazırlanır.",
          list1: "Parti kontrolü",
          text1: "Ton, gözenek, ebat ve yüzey aralığı üretim partisi bazında incelenir.",
          list2: "Şeffaf teknik teyit",
          text2: "Ürün özellikleri ve kullanım koşulları teklif aşamasında proje ekibiyle teyit edilir.",
          list3: "Etiketli paketleme",
          text3: "Ebat ve parti bilgileri kasalarda ayrı gösterilerek stok ve saha dağıtımı kolaylaştırılır.",
        },
        ExportSection: {
          title: "Paketleme ve Sevkiyat",
          text: "Karolar yüzey ve köşeleri koruyan ayırıcılarla güçlendirilmiş kasalara yerleştirilir; ebat ve parti bilgileri sevkiyat öncesinde kontrol edilir.",
        },
        QualitySection: {
          title: "Karo Kalite Kontrolü",
          text: "Kalibrasyon, gönye, kenar doğruluğu, yüzey ve parti aralığı kontrol edilir.",
          subtitle: "Doğal varyasyon",
          subtext: "Ton, damar ve gözenek farklılıkları travertenin doğal karakteridir; uygulama öncesi harmanlama planlanmalıdır.",
        },
        features: ["Modüler ebatlar", "Damar ve enine kesim", "Beş yüzey seçeneği", "Parti bazlı kontrol"],
        TextSection: {
          header1: `${colour} ile Uyumlu Karo Seçenekleri`,
          text1: `${colour} renk ailesi farklı kesim, dolgu, yüzey ve ebatlarla aynı proje içinde koordine edilebilir. Uyumlu kombinasyonlar sipariş öncesinde teyit edilmelidir.`,
          header2: "Bakım",
          text2: "Nötr pH'lı doğal taş temizleyicisi kullanın; asitli ve aşındırıcı ürünlerden kaçının. Emprenye gerekiyorsa bunun leke geçirmezlik değil, leke direnci sağladığını dikkate alın.",
          header3: "Uygulama",
          text3: "Kuru serim ve birkaç kasadan harmanlama, doğal renk ile desen farklılıklarını geniş yüzeye dengeli dağıtır.",
        },
        faq: {
          span: `${colour} Traverten Karolar`,
          items: [
            { q: "Karoların tonu birebir aynı mıdır?", a: "Hayır. Doğal travertende parti içinde ve partiler arasında ton, damar ve gözenek farklılıkları beklenir." },
            { q: "Hangi yüzey seçilmelidir?", a: "Yüzey; görünümün yanında kullanım yoğunluğu, ıslaklık, bakım ve kurulum koşullarına göre seçilmelidir." },
            { q: "Bakımı nasıl yapılır?", a: "Nötr pH'lı doğal taş temizleyicisi kullanın ve asitli ürünlerden kaçının." },
          ],
        },
        microProof: ["Parti bazlı ton kontrolü", "Ebat ve gönye kontrolü", "Etiketli ihracat kasaları"],
      });
    } else {
      Object.assign(node, {
        seo: {
          ...node.seo,
          title: `${colour} Travertine Tiles | Majen`,
          description: `Colour character, formats, finishes, application and care information for ${colour} travertine tiles.`,
        },
        title: `${colour} Travertine Tiles`,
        varianttitle: `${colour} Travertine Tiles`,
        alt: `${colour} travertine tile`,
        intro: `${colour} travertine tiles bring ${tone} and piece-to-piece vein and pore variation to modular natural-stone surfaces. Because the actual production lot may differ from a sample, the shade range should be reviewed before ordering.`,
        title2: `Design Character of ${colour} Tiles`,
        intro2: "Vein-cut tiles show linear movement, while cross-cut tiles show more cloud-like patterning. Filled or unfilled pore structures and natural, honed, polished, brushed or tumbled finishes produce different responses to light and touch.",
        description: [
          "Size, squareness, calibration, finish and shade range are reviewed by production lot.",
          "Modular natural-stone surfaces for interior floors, walls, bathrooms, lobbies and commercial spaces.",
          "Catalogue square, rectangular, large-format and Versailles modules can be selected around the laying plan.",
          "Wet or exterior use must be verified from technical data and the complete installation system.",
        ],
        sizes: ["8×8", "12×12", "12×24", "16×16", "18×18", "24×24", "24×48", "48×110", "Versailles Set"],
        finishes: ["Natural", "Honed", "Polished", "Brushed", "Tumbled"],
        cards: {
          title1: "Colour and Pattern Planning",
          text1: `${colour} tiles offer ${tone}. Vein direction, module distribution and joint layout should be reviewed through dry laying before installation.`,
          title2: "Technical Selection",
          text2: "Thickness, finish and filling should be selected with traffic, substrate, waterproofing, drainage, adhesive and movement-joint design.",
        },
        ApplicationSection: {
          title: `Applications of ${colour} Travertine Tiles`,
          text: "A modular natural-stone surface for interior floors, walls, bathrooms, lobbies and commercial spaces.",
          subtitle: "Wet and exterior areas",
          subtext: "Suitability is determined from technical performance and the complete installation system rather than colour or finish alone.",
        },
        AvailableSection: {
          title: "Format and Cut Options",
          text: "Square, rectangular, large-format and Versailles modules can be planned in vein-cut or cross-cut patterns.",
          subtitle: "Order confirmation",
          subtext: "Available combination, thickness, tolerance and shade range are confirmed before ordering.",
        },
        FinishesSection: {
          title: "Finish Options",
          text: "Honed surfaces are satin-matte, polished surfaces glossy and reflective, while brushed and tumbled finishes provide more texture.",
          subtitle: "Filling selection",
          subtext: "Filled tiles create a more closed, easier-to-clean surface; unfilled tiles retain visible natural pores.",
          subtitle2: "Sample review",
          subtext2: "The colour, finish and filling combination should be reviewed on a representative sample.",
        },
        PartnerSection: {
          title: "Project and Supply Planning",
          description: "Orders are prepared by coordinating size distribution, lot range, finish and crate planning.",
          list1: "Lot control",
          text1: "Shade, pore, size and finish range are reviewed by production lot.",
          list2: "Transparent technical confirmation",
          text2: "Product characteristics and service conditions are confirmed with the project team at quotation stage.",
          list3: "Labelled packing",
          text3: "Size and lot information is shown separately on crates to simplify stock and site distribution.",
        },
        ExportSection: {
          title: "Packing and Shipment",
          text: "Tiles are placed in reinforced crates with separators that protect faces and corners; size and lot information is checked before shipment.",
        },
        QualitySection: {
          title: "Tile Quality Control",
          text: "Calibration, squareness, edge accuracy, finish and lot range are reviewed.",
          subtitle: "Natural variation",
          subtext: "Shade, vein and pore differences are part of travertine's natural character and should be planned through blending before installation.",
        },
        features: ["Modular formats", "Vein and cross cut", "Five finish options", "Lot-based control"],
        TextSection: {
          header1: `Coordinated Tile Options for ${colour}`,
          text1: `The ${colour} colour family can be coordinated across cuts, fillings, finishes and sizes within one project. Available combinations should be confirmed before ordering.`,
          header2: "Care",
          text2: "Use a pH-neutral natural-stone cleaner and avoid acidic or abrasive products. Where an impregnator is used, treat it as improving stain resistance rather than making stone stain-proof.",
          header3: "Installation",
          text3: "Dry laying and blending from several crates distribute natural colour and pattern variation evenly across the surface.",
        },
        faq: {
          span: `${colour} Travertine Tiles`,
          items: [
            { q: "Are all tile shades identical?", a: "No. Natural travertine is expected to vary in shade, vein and pore distribution within and between lots." },
            { q: "Which finish should be selected?", a: "Select the finish for visual intent together with traffic, wetness, maintenance and installation conditions." },
            { q: "How should the tiles be maintained?", a: "Use a pH-neutral natural-stone cleaner and avoid acidic products." },
          ],
        },
        microProof: ["Lot-based shade control", "Size and squareness checks", "Labelled export crates"],
      });
    }
  }
}

for (const lang of ["tr", "en"]) {
  const file = path.join(ROOT, "messages", `${lang}.json`);
  const messages = JSON.parse(fs.readFileSync(file, "utf8"));
  const tiles = messages.ProductPage.tiles;
  applyRoot(tiles, rootContent(lang));
  updateLegacyTileVariants(tiles, lang);

  tiles.cuts.heading = lang === "tr" ? "Traverten Karo Kesim Yönleri" : "Travertine Tile Cut Directions";
  tiles.cuts.text = lang === "tr"
    ? "Damar kesim doğrusal, enine kesim ise bulutsu bir desen oluşturur. Kesim yönünden sonra dolgu, yüzey, ebat ve renk seçeneklerine ilerleyin."
    : "Vein cut creates a linear pattern, while cross cut creates a cloud-like pattern. After choosing the cut direction, continue to filling, finish, size and colour options.";
  tiles.cuts.detailsHeadings = rootContent(lang).detailsHeadings;
  tiles.cuts.description = rootContent(lang).description;

  for (const cut of CUTS) {
    const cutNode = tiles.cuts[cut];
    if (!cutNode) continue;
    const copy = cutContent(lang, cut);
    cutNode.seo = { ...cutNode.seo, title: copy.seoTitle, description: copy.seoDescription };
    cutNode.title = copy.title;
    cutNode.alt = copy.title;
    cutNode.span = copy.span;
    cutNode.intro = copy.intro;
    cutNode.title2 = copy.title2;
    cutNode.intro2 = copy.intro2;
    cutNode.desc = copy.desc;
    cutNode.TextSection = copy.textSection;
    cutNode.detailsHeadings = rootContent(lang).detailsHeadings;
    cutNode.description = rootContent(lang).description;
    cutNode.QuestionsItems = rootContent(lang).faq;
    cutNode.variants = {
      title: lang === "tr" ? "Dolgu ve Yüzey Seçenekleri" : "Filling and Finish Options",
      text: lang === "tr"
        ? "Kesim yönünden sonra dolgulu veya dolgusuz yapı ile doğal, honlanmış, cilalı, fırçalanmış ve eskitilmiş yüzeyler arasından seçim yapın. Uygunluk proje koşullarına göre doğrulanmalıdır."
        : "After selecting the cut direction, choose a filled or unfilled structure and a natural, honed, polished, brushed or tumbled finish. Suitability must be verified for the project conditions.",
    };
    if (cutNode.hero && typeof cutNode.hero === "object") cutNode.hero.alt = copy.title;

    const processes = cutNode.processes || {};
    processes.heading = lang === "tr" ? "Dolgu ve Yüzey İşlemini Seçin" : "Choose Filling and Finish";
    processes.subtext = lang === "tr"
      ? "Önce gözenek yapısını, ardından kullanım ve görünüm hedefinize uygun yüzeyi seçin."
      : "Select the pore structure first, then the finish that suits the intended use and visual target.";
    if (processes.groups?.filled) {
      processes.groups.filled.heading = lang === "tr" ? "Dolgulu İşlemler" : "Filled Options";
      processes.groups.filled.text = lang === "tr"
        ? "Gözenekleri üretim sırasında doldurulan yüzey seçenekleri."
        : "Finish options with pores filled during production.";
    }
    if (processes.groups?.unfilled) {
      processes.groups.unfilled.heading = lang === "tr" ? "Dolgusuz İşlemler" : "Unfilled Options";
      processes.groups.unfilled.text = lang === "tr"
        ? "Doğal gözenekleri görünür bırakan yüzey seçenekleri."
        : "Finish options that retain visible natural pores.";
    }
    for (const processKey of TILE_PROCESS_KEYS) {
      const processNode = processes[processKey] ||= {};
      const sizes = processNode.sizes ||= {};
      delete sizes.versailles_set;
      for (const sizeKey of TILE_SIZE_KEYS) sizes[sizeKey] ||= {};
    }
    if (processes.meta) {
      for (const [finish, meta] of Object.entries(processes.meta)) {
        if (!meta || typeof meta !== "object") continue;
        meta.title = labels[lang].finish[finish] || meta.title;
        meta.alt = `${labels[lang].finish[finish] || finish} ${labels[lang].cuts[cut]} ${labels[lang].product}`;
      }
    }

    for (const [rawKey, processNode] of Object.entries(processes)) {
      if (SKIP_PROCESS_KEYS.has(rawKey) || !processNode || typeof processNode !== "object") continue;
      const processCopy = processContent(lang, cut, rawKey);
      processNode.seo = { ...processNode.seo, ...processCopy.seo };
      processNode.h1 = processCopy.title;
      processNode.title = processCopy.title;
      processNode.lead = processCopy.lead;
      processNode.intro = processCopy.intro;
      processNode.title2 = processCopy.title2;
      processNode.intro2 = processCopy.intro2;
      processNode.detailsHeadings = processCopy.detailsHeadings;
      processNode.description = processCopy.description;
      processNode.TextSection = processCopy.textSection;
      processNode.QuestionsItems = processCopy.faq;
      processNode.variants = processCopy.variants;
      updateSizeNodes(lang, cut, rawKey, processNode);
      updateLegacyColorNodes(lang, cut, rawKey, processNode);
    }
  }

  fs.writeFileSync(file, `${JSON.stringify(messages, null, 2)}\n`);
}

console.log("Tiles content updated for TR and EN.");
