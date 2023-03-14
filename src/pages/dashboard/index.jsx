import React, { useEffect, useState } from "react";
import {
  Button,
  Header,
  Icon,
  Segment,
  Image,
  Label,
  Grid,
  Container,
} from "semantic-ui-react";
import $ from "jquery";
import AnimIcon from "../../utils/inviteIcon";
function SegmentExamplePlaceholderInline(prop) {
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const addBtn = document.querySelector(".add-button");

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      window.deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      setRefresh(1);
    });
    addBtn.addEventListener("click", async () => {
      console.log("👍", "butInstall-clicked");
      const promptEvent = window.deferredPrompt;
      if (!promptEvent) {
        // The deferred prompt isn't available.
        return;
      }
      // Show the install prompt.
      promptEvent.prompt();
      // Log the result
      const result = await promptEvent.userChoice;
      console.log("👍", "userChoice", result);
      // Reset the deferred prompt variable, since
      // prompt() can only be called once.
      window.deferredPrompt = null;
    });
    window.addEventListener("appinstalled", (event) => {
      setRefresh(0);
      window.deferredPrompt = null;
    });
  }, []);

  return (
    <>
      <div className="text-center shadow-lg p-1 mb-5">
        <Segment
          textAlign="center"
          inverted
          className="fadeout"
          style={{
            height: "60vh",
            backgroundColor: "rgba(0,0,0,.5)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: -1,
          }}
        ></Segment>
        <Segment textAlign="center" basic as={Container}>
          <div style={{ height: 10, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                zIndex: 0,
                top: -100,
                width: "100%",
                textAlign: "center",
                opacity: 0.3,
              }}
            >
              <AnimIcon
                icon="hpxruznz"
                width="400px"
                height="440px"
                trigger="hover"
              />
            </div>
          </div>
          <Header icon>
            <Icon>
              <Image
                src="/assets/images/logosq.webp"
                centered
                style={{ width: "30vw", maxWidth: "200px" }}
              />
            </Icon>
          </Header>

          <Segment inverted padded="very" className="fadeoutend">
            <h1 className="text-center">
              <strong className="farsi fw-bold fs-1 text-gold">
                گلکسی کازینو
              </strong>
            </h1>

            <h2 className="farsi lh-base fs-5 text-center">
              معتبرترین و بهترین اپلیکیشن
              <br /> پوکر، انفجار، تخته نرد، بلک جک، رولت و انواع اسلات
            </h2>
            <span className="farsi fs-5 ui label red mini pointing">
              با پول واقعی در ایران
            </span>
          </Segment>
          {refresh > 0 ? (
            <>
              <img
                src="/maskable_icon_x192.png"
                alt="اپلیکیشن گلکسی کازینو"
                title="اپلیکیشن گلکسی کازینو"
                onClick={() => {
                  $(".add-button").trigger("click");
                }}
              />
              <br />
              <Button
                as="div"
                labelPosition="left"
                size="massive"
                onClick={() => {
                  $(".add-button").trigger("click");
                }}
              >
                <Label size="huge" color="orange" className="farsi">
                  نصب اپلیکیشن
                </Label>
                <Button icon size="massive" color="orange">
                  <Icon name="chrome" />
                </Button>
              </Button>
            </>
          ) : (
            <Segment.Inline className="text-center">
              <Button
                color="orange"
                size="huge"
                className="farsi"
                onClick={() => $("#openLogin").trigger("click")}
              >
                ورود
              </Button>{" "}
              <Button
                basic
                color="yellow"
                size="huge"
                className="farsi"
                onClick={() => $("#openRegister").trigger("click")}
              >
                ثبت نام
              </Button>
            </Segment.Inline>
          )}
        </Segment>

        <br />
        <br />

        <br />
        <br />
        <div
          className="fadeoutend container"
          style={{ height: 120, position: "relative" }}
        >
          <div style={{ position: "absolute", zIndex: 0, top: 10 }}>
            <AnimIcon
              icon="hciqteio"
              width="300px"
              height="140px"
              trigger="loop"
            />
          </div>
        </div>

        <Segment inverted padded="very" as={Container} className="fadeoutend">
          <Grid reversed="computer tablet">
            <Grid.Column mobile={16} tablet={10} computer={10}>
              <div className="farsi">
                <h3 className="farsi">بازی پوکر آنلاین با پول واقعی</h3>
                <p className="lh-base">
                  سلام، به سایت گلکسی کازینو خوش آمدید. در اینجا، شما می توانید
                  بازی های پوکر آنلاین را با بازیکنانی از سراسر جهان تجربه کنید.
                  با امکانات پیشرفته و رابط کاربری ساده، شما می توانید به راحتی
                  بازی کنید و تجربه یک بازی پوکر واقعی را داشته باشید.
                </p>
                <p className="lh-base">
                  در گلکسی کازینو، شما می توانید به انواع بازی های پوکر از جمله
                  تگزاس هولدم، اوماها، سوپر ستود و... دسترسی پیدا کنید. همچنین،
                  با شرکت در مسابقات و رقابت های مختلف، می توانید به عنوان یک
                  بازیکن حرفه ای در پوکر به شهرت و پول برسید.
                </p>
                <p className="lh-base">
                  در گلکسی کازینو، امنیت شما برای ما بسیار مهم است و به همین
                  دلیل، با استفاده از فناوری های پیشرفته از جمله رمزنگاری،
                  اطلاعات شما را محافظت می کنیم. بنابراین، با اطمینان کامل می
                  توانید بازی کنید و لذت ببرید.
                </p>
              </div>
              <br />
              <Segment.Inline className="text-end">
                <Button
                  basic
                  color="yellow"
                  size="large"
                  className="farsi"
                  onClick={() => $("#openRegister").trigger("click")}
                >
                  ثبت نام در گلکسی کازینو
                </Button>
              </Segment.Inline>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={6} computer={6}>
              <Image
                src="/assets/images/pkr.webp"
                width="100"
                height="100"
                alt="بازی پوکر آنلاین با پول واقعی"
                fluid
                rounded
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment inverted padded="very" as={Container} className="fadeoutend">
          <Grid>
            <Grid.Column mobile={16} tablet={10} computer={10}>
              <div className="farsi">
                <h4 className="farsi">
                  شارژ حساب و برداشت آسان در گلکسی کازینو{" "}
                </h4>
                <p className="lh-base">
                  برای شارژ حساب و کشوت (برداشت) در سایت گلکسی کازینو می توانید
                  از طریق درگاه بانکی اقدام کنید و یا از سایت های ایرانی خرید و
                  فروش اتوماتیک ووچر پرفکت مانی ، اقدام به خرید ووچر کرده و کد
                  ووچرتان را در صفحه دیپازیت سایت وارد کنید تا بلافاصله اکانتتان
                  معادل رقم آن ووچر شارژ گردد. علاوه بر آن می توانید از بیت کوین
                  برای بازی پوکر آنلاین استفاده کنید.
                </p>
                <p className="lh-base">
                  در هنگام کشوت از گلکسی کازینو هم بسته به گزینه انتخابی تان یا
                  به صورت واریز شتاب به کارت بانکی تان پرداخت صورت می گیرد و یا
                  معادل رقم درخواستی جهت برداشت یک ووچر در صفحه تراکنش تان به
                  شما داده می شود.
                </p>
              </div>
              <br />
              <Segment.Inline className="text-end">
                <Button
                  basic
                  color="yellow"
                  size="large"
                  className="farsi"
                  onClick={() => $("#openRegister").trigger("click")}
                >
                  ثبت نام در گلکسی کازینو
                </Button>
              </Segment.Inline>{" "}
              <br /> <br />
            </Grid.Column>
            <Grid.Column tablet={6} computer={6} only="tablet computer">
              <Image
                src="/assets/images/cash.webp"
                width="70"
                height="56"
                alt="شارژ حساب و برداشت آسان در گلکسی کازینو"
                fluid
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment inverted padded="very" as={Container} className="fadeoutend">
          <Grid reversed="computer tablet">
            <Grid.Column mobile={16} tablet={10} computer={10}>
              <div className="farsi">
                <h2 className="farsi">انواع بازی های کازینویی با پول واقعی</h2>
                <p className="lh-base">
                  در سایت گلکسی کازینو می توانید از انواع بازی های کازینویی
                  مانند{" "}
                  <strong className="farsi fw-bold fs-6 text-gold">
                    انفجار، تخته نرد، بلک جک، رولت و انواع اسلات
                  </strong>{" "}
                  را به صورت آنلاین بازی کنید و از طریق درگاه برداشت کنید.
                </p>
                <br />
                <Segment.Inline className="text-end">
                  <Button
                    basic
                    color="yellow"
                    size="large"
                    className="farsi"
                    onClick={() => $("#openRegister").trigger("click")}
                  >
                    ثبت نام در گلکسی کازینو
                  </Button>
                </Segment.Inline>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={6} computer={6}>
              <Image
                src="/assets/images/cas.gif"
                width="100"
                height="100"
                alt="انواع بازی های کازینویی با پول واقعی"
                fluid
                rounded
                bordered
              />
              <br />
              <br />
            </Grid.Column>
          </Grid>
        </Segment>

        <br />
        <br />

        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default SegmentExamplePlaceholderInline;
