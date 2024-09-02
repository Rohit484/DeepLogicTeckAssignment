BASE_URL = "https://time.com/";

final_result = [];

const request = async (url) => {
  const response = await fetch(url);
  const data = await response.text();

  // Find the "<div class="partial latest-stories" data-module_name="Latest Stories">anything</div>" in the html data by use of regex
  const regex =
    /<div class="partial latest-stories" data-module_name="Latest Stories">[\s\S]*<\/div>    <\/section>/;
  const section_data = data.match(regex);
  // console.log(section_data[0]);

  // find all the <li> tags in the section_data by the use of regex
  const regex_li = /<li class="latest-stories__item">[\s\S]*?<\/li>/g;
  const li_data = section_data[0].match(regex_li);
  // console.log(li_data);

  // find the title and link of each <li> tag by the use of regex
  const regex_title =
    /<h3 class="latest-stories__item-headline">[\s\S]*?<\/h3>\n/;
  const regex_link = /<a href=".+?\/">\n/;
  li_data.forEach((li) => {
    const title = li.match(regex_title);
    const link = li.match(regex_link);
    final_tital = title[0]
      .replace(`<h3 class="latest-stories__item-headline">`, "")
      .replace(`</h3>`, "");
    final_link = link[0].replace(`<a href="`, "").replace(`">`, "");
    final_result.push({ title: final_tital, link: BASE_URL + final_link });
  });

  console.log(final_result);
};

request(BASE_URL);
