import React from "react";
import {
  Button,
  Header,
  Icon,
  Segment,
  Image,
  Grid,
  Container,
} from "semantic-ui-react";
import $ from "jquery";
import Stat from "./rewardStat";
const SegmentExamplePlaceholderInline = (prop) => (
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
        <Header icon>
          <Icon>
            <Image
              src="/assets/images/logosq.png"
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

          <h3 className="farsi lh-base fs-5 text-center">
            معتبرترین و بهترین اپلیکیشن
            <br /> پوکر، انفجار، تخته نرد، بلک جک، رولت و انواع اسلات
          </h3>
          <strong className="farsi fs-4 ui label red mini pointing">
            با پول واقعی در ایران
          </strong>
        </Segment>
      </Segment>
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
      <br />
      <br />

      <br />
      <br />
    </div>

    <Segment inverted padded="very" as={Container} className="fadeoutend">
      <Grid reversed="computer tablet">
        <Grid.Column mobile={16} tablet={10} computer={10}>
          <div className="farsi">
            <h2 className="farsi">بازی پوکر آنلاین با پول واقعی</h2>
            <p className="lh-base">
              پوکر بازی محبوب جوانان با پاستور میباشد , بازی پوکر دو نفره تا 10
              نفره امکان پذیر است. رده سنی بازی پوکر 18 تا 99 سال می باشد. شما
              می توانید بازی پوکر را به صورت آنلاین در سایت گلکسی کازینو بازی
              کنید و از طریق درگاه برداشت کنید.
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
          <Image src="/assets/images/pkr.png" fluid rounded />
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment inverted padded="very" as={Container} className="fadeoutend">
      <Grid>
        <Grid.Column mobile={16} tablet={10} computer={10}>
          <div className="farsi">
            <h2 className="farsi">شارژ حساب و برداشت آسان در گلکسی کازینو </h2>
            <p className="lh-base">
              برای شارژ حساب و کشوت (برداشت) در سایت گلکسی کازینو می توانید از
              طریق درگاه بانکی اقدام کنید و یا از سایت های ایرانی خرید و فروش
              اتوماتیک ووچر پرفکت مانی ، اقدام به خرید ووچر کرده و کد ووچرتان را
              در صفحه دیپازیت سایت وارد کنید تا بلافاصله اکانتتان معادل رقم آن
              ووچر شارژ گردد. علاوه بر آن می توانید از بیت کوین برای بازی پوکر
              آنلاین استفاده کنید.
            </p>
            <p className="lh-base">
              در هنگام کشوت از گلکسی کازینو هم بسته به گزینه انتخابی تان یا به
              صورت واریز شتاب به کارت بانکی تان پرداخت صورت می گیرد و یا معادل
              رقم درخواستی جهت برداشت یک ووچر در صفحه تراکنش تان به شما داده می
              شود.
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
            src="https://emperorpoker.online/wp-content/uploads/2020/09/emperor-poker.png"
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
              در سایت گلکسی کازینو می توانید از انواع بازی های کازینویی مانند{" "}
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
          <Image src="/assets/images/cas.gif" fluid rounded bordered />
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment inverted padded="very" as={Container} className="fadeoutend">
      <h2 className="farsi text-end">جوایز میلیونی در گلکسی کازینو </h2>
      <Grid>
        <Grid.Column mobile={16} tablet={10} computer={10}>
          <div>
            <Stat {...prop} />
          </div>
        </Grid.Column>
        <Grid.Column tablet={6} computer={6} only="tablet computer">
          <Image
            src="https://emperorpoker.online/wp-content/uploads/2020/09/emperor-poker.png"
            fluid
          />
        </Grid.Column>
      </Grid>
    </Segment>
    <br />
    <br />

    <br />
    <br />
    <br />
    <br />
  </>
);

export default SegmentExamplePlaceholderInline;
