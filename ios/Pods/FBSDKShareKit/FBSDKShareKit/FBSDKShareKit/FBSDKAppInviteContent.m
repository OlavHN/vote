// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
//
// You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
// copy, modify, and distribute this software in source code or binary form for use
// in connection with the web services and APIs provided by Facebook.
//
// As with any software that integrates with the Facebook platform, your use of
// this software is subject to the Facebook Developer Principles and Policies
// [http://developers.facebook.com/policy/]. This copyright notice shall be
// included in all copies or substantial portions of the software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#import "FBSDKAppInviteContent.h"

#import "FBSDKCoreKit+Internal.h"

#define FBSDK_APP_INVITE_CONTENT_APP_LINK_URL_KEY @"appLinkURL"
#define FBSDK_APP_INVITE_CONTENT_PREVIEW_IMAGE_KEY @"previewImage"
#define FBSDK_APP_INVITE_CONTENT_PROMO_CODE_KEY @"promoCode"
#define FBSDK_APP_INVITE_CONTENT_PROMO_TEXT_KEY @"promoText"


@implementation FBSDKAppInviteContent

- (NSURL *)previewImageURL
{
  return self.appInvitePreviewImageURL;
}

- (void)setPreviewImageURL:(NSURL *)previewImageURL
{
  self.appInvitePreviewImageURL = previewImageURL;
}

#pragma mark - Equality

- (NSUInteger)hash
{
  NSUInteger subhashes[] = {
    [_appLinkURL hash],
    [_appInvitePreviewImageURL hash],
    [_promotionCode hash],
    [_promotionText hash],
  };
  return [FBSDKMath hashWithIntegerArray:subhashes count:sizeof(subhashes) / sizeof(subhashes[0])];
}

- (BOOL)isEqual:(id)object
{
  if (self == object) {
    return YES;
  }
  if (![object isKindOfClass:[FBSDKAppInviteContent class]]) {
    return NO;
  }
  return [self isEqualToAppInviteContent:(FBSDKAppInviteContent *)object];
}

- (BOOL)isEqualToAppInviteContent:(FBSDKAppInviteContent *)content
{
  return (content &&
          [FBSDKInternalUtility object:_appLinkURL isEqualToObject:content.appLinkURL] &&
          [FBSDKInternalUtility object:_appInvitePreviewImageURL isEqualToObject:content.appInvitePreviewImageURL] &&
          [FBSDKInternalUtility object:_promotionText isEqualToObject:content.promotionText] &&
          [FBSDKInternalUtility object:_promotionCode isEqualToObject:content.promotionText]
          );
}

#pragma mark - NSCoding

+ (BOOL)supportsSecureCoding
{
  return YES;
}

- (id)initWithCoder:(NSCoder *)decoder
{
  if ((self = [self init])) {
    _appLinkURL = [decoder decodeObjectOfClass:[NSURL class] forKey:FBSDK_APP_INVITE_CONTENT_APP_LINK_URL_KEY];
    _appInvitePreviewImageURL = [decoder decodeObjectOfClass:[NSURL class] forKey:FBSDK_APP_INVITE_CONTENT_PREVIEW_IMAGE_KEY];
    _promotionCode = [decoder decodeObjectOfClass:[NSString class] forKey:
        FBSDK_APP_INVITE_CONTENT_PROMO_CODE_KEY];
    _promotionText = [decoder decodeObjectOfClass:[NSString class] forKey:
        FBSDK_APP_INVITE_CONTENT_PROMO_TEXT_KEY];

  }
  return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder
{
  [encoder encodeObject:_appLinkURL forKey:FBSDK_APP_INVITE_CONTENT_APP_LINK_URL_KEY];
  [encoder encodeObject:_appInvitePreviewImageURL forKey:FBSDK_APP_INVITE_CONTENT_PREVIEW_IMAGE_KEY];
  [encoder encodeObject:_promotionCode forKey:FBSDK_APP_INVITE_CONTENT_PROMO_CODE_KEY];
  [encoder encodeObject:_promotionText forKey:FBSDK_APP_INVITE_CONTENT_PROMO_TEXT_KEY];

}

#pragma mark - NSCopying

- (id)copyWithZone:(NSZone *)zone
{
  FBSDKAppInviteContent *copy = [[FBSDKAppInviteContent alloc] init];
  copy->_appLinkURL = [_appLinkURL copy];
  copy->_appInvitePreviewImageURL = [_appInvitePreviewImageURL copy];
  copy->_promotionText = [_promotionText copy];
  copy->_promotionCode = [_promotionCode copy];
  return copy;
}

@end
