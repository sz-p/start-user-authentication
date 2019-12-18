export default {
  success: function (msg) {
    return {
      success: true,
      status: 0,
      api: msg.api,
      information: msg.infor,
      data: msg.data
    }
  }
}
